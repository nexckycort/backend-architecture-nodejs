export interface ReqUser {
  name: string
  email: string
  password: string
}

export interface User extends ReqUser {
  id: number
}
