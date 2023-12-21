import { gql } from './__generated__';

export const GET_ALL_AUTHORS = gql(/* GraphQL */ `
  query GetAllAuthors {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`);