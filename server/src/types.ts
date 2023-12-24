import { Date, Types } from 'mongoose';

export interface IAuthor {
  name: string
  born: number
  bookCount: number
  books: Types.ObjectId[],
  createdAt: Date
  updatedAt: Date
}

export interface IBook {
  title: string
  published: number
  author: Types.ObjectId
  genres: string[],
  createdAt: Date
  updatedAt: Date
}

export interface IUser {
  username: string
  name: string
  favoriteGenre: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}