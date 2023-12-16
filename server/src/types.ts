import { Types } from 'mongoose';

export interface IBook {
  title: string
  published: number
  author: Types.ObjectId
  genres: string[]
}
