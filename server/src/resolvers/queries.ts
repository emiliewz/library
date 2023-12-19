import { QueryResolvers } from '../__generated__/resolvers-types';
import Author from '../models/author';
import Book from '../models/book';

type AllBooksQuery = {
  author: string | undefined
  genres: string | undefined
};

const queries: QueryResolvers = {
  bookCount: async () => Book.collection.countDocuments(),
  authorCount: async () => Author.collection.countDocuments(),
  allBooks: async (_root, { author, genre }) => {
    let query = {} as AllBooksQuery;
    if (author) {
      const authorOfBook = await Author.findOne({ name: author });
      query = { ...query, author: authorOfBook?._id.toString() };
    }
    if (genre) {
      query = { ...query, genres: genre };
    }
    return Book.find(query).populate('author');
  },
  allAuthors: async () => Author.find({}),
};

export default queries;
