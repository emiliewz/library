import { GraphQLError } from 'graphql';
import { MutationResolvers } from '../__generated__/resolvers-types';
import Author from '../models/author';
import Book from '../models/book';
import { HydratedDocument } from 'mongoose';
import { IBook, IUser } from '../types';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import { pubsub } from './subscriptions';

const mutations: MutationResolvers = {
  addBook: async (_root, { title, published, author, genres }, contextValue) => {
    const book: HydratedDocument<IBook> = new Book({ title, published, genres });
    let authorInDb = await Author.findOne({ name: author });

    if (!contextValue.user) {
      throw new GraphQLError('not authenticated', {
        extensions: {
          code: 'BAD_USER_INPUT',
        }
      });
    }

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
      await book.save();

      await pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') });
      return book.populate('author');
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

  editAuthor: async (_root, { name, setBornTo }, contextValue) => {
    const author = await Author.findOne({ name });

    if (!contextValue.user) {
      throw new GraphQLError('not authenticated', {
        extensions: {
          code: 'BAD_USER_INPUT',
        }
      });
    }

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
          invalidArgs: password,
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
  },

  login: async (_root, { username, password }) => {
    const user = await User.findOne({ username });

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      throw new GraphQLError('invalid username or password', {
        extensions: {
          code: 'BAD_USER_INPUT',
        }
      });
    }

    const userForToken: jwt.UserForTokenPayload = {
      username: user.username,
      id: user._id,
    };

    const token: string = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 });
    return { token, username: user.username, name: user.name };
  }
};

export default mutations;
