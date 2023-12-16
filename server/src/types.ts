import { Types } from 'mongoose';

export interface IAuthor {
  name: string
  born: number
  bookCount: number
  books: Types.ObjectId[]
}

export interface IBook {
  title: string
  published: number
  author: Types.ObjectId
  genres: string[]
}

export interface IUser {
  username: string
  name: string
  favoriteGenre: string
}