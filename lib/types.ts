export interface UserInfo {
  nombre: string
  apellido: string
  pais: string
  provincia: string
  universidad: string
  facultad: string
  año: number
}

export interface User {
  id: string
  email: string
  avatar?: string
  info: UserInfo
}