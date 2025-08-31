export interface UserInfo {
  firstName: string
  lastName: string
  country: string
  state: string
  university: string
  faculty: string
  year: number
}

export interface User {
  id: string
  email: string
  avatar?: string
  info: UserInfo
}
