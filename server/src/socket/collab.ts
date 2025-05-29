import { Socket } from "socket.io";
import GroupsModel from "../models/Groups";
import * as Y from 'yjs'
export const  handleCollabEvents =(socket:Socket)=>{
  //接收用户加入房间通信
socket.on('join-doc', async (docId: string) => {
  console.log(`User joined doc: ${docId}`);
  try {
    const doc = await GroupsModel.findById(docId);
    if (!doc) {
      throw new Error('Document not found');
    }

    let contentBuffer: Uint8Array;

    if (!doc.content || doc.content.length === 0) {
      const ydoc = new Y.Doc();
      const content = ydoc.getXmlFragment('content');
      content.insert(0, [new Y.XmlText('新文档')]);
      content.insert(0, [new Y.XmlElement('p')]); // 确保初始内容结构正确
      contentBuffer = Y.encodeStateAsUpdate(ydoc);

      // 验证生成的 update 数据是否有效
      if (contentBuffer.length === 0) {
        throw new Error('Generated update data is empty');
      }

      doc.content = Buffer.from(contentBuffer);
      await doc.save();
    } else {
      contentBuffer = new Uint8Array(doc.content.buffer);
      if (contentBuffer.length === 0) {
        throw new Error('Empty content buffer');
      }
    }

    socket.emit('doc-init', contentBuffer);
  } catch (err) {
    console.error('Error initializing document:', err);
    socket.emit('error', '加载文档失败');
  }
});
  socket.on('yjs-update',async (docId:string,update:Uint8Array)=>{
    try {
      const doc = await GroupsModel.findById(docId)
      if(!doc) {
        throw new Error('没有该文档')
      }
      //创建一个ydoc
      const ydoc = new Y.Doc()
      if(doc.content && doc.content.length>0){
      //给这个ydoc加旧的文档状态
          Y.applyUpdate(ydoc, new Uint8Array(doc.content.buffer));
      }
      //给这个ydoc加新更新状态
      Y.applyUpdate(ydoc,update)
      //保持为一个二进制包
      const mergedUpdate = Y.encodeStateAsUpdate(ydoc)
      //转为buffer
      doc.content = Buffer.from(mergedUpdate)
      //保持数据
      await doc.save()
      //广播给其他用户
      socket.to(docId).emit('yjs-update',update)
    }catch(err){
      socket.emit('error','更新文档失败')
    }
  })
}