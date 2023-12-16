const typeDefs = `
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type Author {
  name: String!
  born: Int
  bookCount: Int!
  books: [Book!]!
  id: ID!
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

`;

export default typeDefs;