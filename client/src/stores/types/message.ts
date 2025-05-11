export type Message = {
  id: string,
  content:string,
  createdAt:string,
  sender: {
    id:string,
    username:string,
    avater:string
  }
}
export type ChatState= {
  messageCache:Map<string,Message[]>
  activeMessages:Message[]
  pagination:Map<string, {
    currentPage:number
    totalPages:number
  }>
}