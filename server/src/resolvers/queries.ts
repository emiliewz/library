import { QueryResolvers } from '../__generated__/resolvers-types';
import Author from '../models/author';
import Book from '../models/book';

const queries: QueryResolvers = {
  bookCount: async () => Book.collection.countDocuments(),
  authorCount: async () => Author.collection.countDocuments()
};

export default queries;
