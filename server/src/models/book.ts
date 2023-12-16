import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IBook } from '../types';

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  published: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    {
      type: String
    }
  ]
});

bookSchema.plugin(uniqueValidator);
bookSchema.set('toJSON', {
  transform: (_doc, ret: Record<string, string>) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Book = model<IBook>('Book', bookSchema);
export default Book;