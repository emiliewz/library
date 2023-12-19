import { GraphQLError } from 'graphql';
import { MutationResolvers } from '../__generated__/resolvers-types';
import Author from '../models/author';
import Book from '../models/book';
import { HydratedDocument, Types } from 'mongoose';
import { IBook, IUser } from '../types';
import User from '../models/user';
import bcrypt from 'bcrypt';
import 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface UserForTokenPayload extends JwtPayload {
    username: string,
    id: Types.ObjectId,
  }
}

const mutations: MutationResolvers = {
  addBook: async (_root, { title, published, author, genres }) => {
    const book: HydratedDocument<IBook> = new Book({ title, published, genres });
    let authorInDb = await Author.findOne({ name: author });

    try {
      if (!authorInDb) {
        authorInDb = new Author({ name: author });
      }
      authorInDb.books.push(book._id);
      authorInDb.bookCount = authorInDb.books.length;
      await authorInDb.save();
    } catch (error) {
      throw new GraphQLError('Saving author failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: { author },
          error
        }
      });
    }

    try {
      book.author = authorInDb._id;
      return (await book.save()).populate('author');
    } catch (error) {
      throw new GraphQLError('Saving book failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: { title, published, genres },
          error
        }
      });
    }
  },

  editAuthor: async (_root, { name, setBornTo }) => {
    const author = await Author.findOne({ name });
    if (author) {
      try {
        author.born = setBornTo;
        return (await author.save()).populate('books');
      } catch (error) {
        throw new GraphQLError('Editing bornyear failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: setBornTo,
            error
          }
        });
      }
    }
    throw new GraphQLError('Author does not exist', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: name
      }
    });
  },

  createUser: async (_root, { username, favoriteGenre, name, password }) => {
    if (!password || password.length < 6) {
      throw new GraphQLError('`password` is shorter than the minimum allowed length (6)', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: username && favoriteGenre,
        }
      });
    }

    const saltRounds: number = 10;
    const passwordHash: string = await bcrypt.hash(password, saltRounds);

    const user: HydratedDocument<IUser> = new User({ username, favoriteGenre, name, passwordHash });
    try {
      await user.save();
      return User.findById(user.id);
    } catch (error) {
      throw new GraphQLError('Creating the user failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: error,
          error
        }
      });
    }
  }
};

export default mutations;
