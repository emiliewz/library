import { GraphQLError } from 'graphql';
import { MutationResolvers } from '../__generated__/resolvers-types';
import Author from '../models/author';
import Book from '../models/book';
import { HydratedDocument } from 'mongoose';
import { IBook } from '../types';

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
  }
};

export default mutations;
