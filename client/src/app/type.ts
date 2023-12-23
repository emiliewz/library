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
  favoriteGenre: string
}

export interface Info {
  message: string
  type: string
}

export type NotifyProp = (message: string, type?: string) => void;