export interface Author {
  name: string
  id: string
  born?: number | null
  bookCount: number
}

export interface User {
  name: string
  token: string
  username: string
}

export interface Info {
  message: string
  type: string
}