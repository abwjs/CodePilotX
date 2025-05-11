import { Socket } from "socket.io";
import GroupsModel from "../models/Groups";
import * as Y from 'yjs'
export const  handleCollabEvents =(socket:Socket)=>{
  //接收用户加入房间通信
  socket.on('join-doc',async(docId:string)=>{ 
   try {
    const doc = await GroupsModel.findById(docId)
    if(!doc) {
      throw new Error('没有该文档')
    }
    if (!doc.content || !(doc.content instanceof Buffer)) {
        throw new Error('文档内容格式错误')
      }
    //获取此时文档的buffer数据
    const contentBuffer = new Uint8Array(doc.content.buffer)
    //发送给当前连接的用户
    socket.emit('doc-init',contentBuffer)
   }catch(err) {
    socket.emit('error','加载文档失败')
   }
  })
  socket.on('yjs-update',async (docId:string,update:Uint8Array)=>{
    try {
      const doc = await GroupsModel.findById(docId)
      if(!doc) {
        throw new Error('没有该文档')
      }
      //创建一个ydoc
      const ydoc = new Y.Doc()
      //给这个ydoc加旧的文档状态
      Y.applyUpdate(ydoc,doc.content)
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