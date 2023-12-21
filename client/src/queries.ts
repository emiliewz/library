import { gql } from './__generated__';

export const EDIT_BORN_YEAR = gql(/* GraphQL */ `
  mutation EditBirthYear($name: String!, $born: Int!){
    editAuthor(
      name: $name
      setBornTo: $born
    ) {
      name
      id
      born
      bookCount
    }
  }
`);

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

export const LOGIN_USER = gql(/* GraphQL */ `
  mutation LoginUser($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      username
      token
      name
    }
  }
`);