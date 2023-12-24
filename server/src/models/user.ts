import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IUser } from '../types';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  name: {
    type: String,
    required: true
  },
  favoriteGenre: {
    type: String
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 6
  }
}, { timestamps: true });

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (_doc, ret: Record<string, string>) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  }
});
const User = model<IUser>('User', userSchema);

export default User;