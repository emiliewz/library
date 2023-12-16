const typeDefs = `
type Book {
  title: String!
  published: Int!
  author: String
  genres: [String!]!
  id: ID!
}
`;

export default typeDefs;