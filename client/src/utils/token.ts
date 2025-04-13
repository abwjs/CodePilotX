export const SET_TOKEN = (token: string) => {
  localStorage.setItem('token', token)
}
export const GET_TOKEN = () => {
  return localStorage.getItem('token') || null
}
export const REMOVE_TOKEN = () => {
  return localStorage.removeItem('token')
}
