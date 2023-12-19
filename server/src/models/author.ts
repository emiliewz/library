import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IAuthor } from '../types';

const authorSchema = new Schema<IAuthor>({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 4
  },
  born: {
    type: Number,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ],
  bookCount: {
    type: Number,
    default: 0
  }
});

authorSchema.plugin(uniqueValidator);

authorSchema.set('toJSON', {
  transform: (_doc, ret: Record<string, string>) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});
const Author = model<IAuthor>('Author', authorSchema);

export default Author;