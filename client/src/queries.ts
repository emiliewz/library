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

export const GET_ALL_BOOKS = gql(/* GraphQL */ `
  query GetAllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre ) {
      title
      published
      author {
        name
        born
      }
      id
      genres
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
      favoriteGenre
    }
  }
`);

export const ADD_BOOK = gql(/* GraphQL */ `
  mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
      }
      id
      genres
    }
  }
`);

export const GET_USER = gql(/* GraphQL */ `
  query GetUser {
    me {
      username
      favoriteGenre
      name
      id
    }
  }
`);

export const GET_LOGGEDIN_USER = gql(/* GraphQL */ `
  query GetLoggedInUser {
    getLoggedInUser @client {
      username
      token
      name
      favoriteGenre
    }
  }
`);

export const REGISTER_USER = gql(/* GraphQL */ `
  mutation RegisterUser($username: String!, $password: String!, $name: String!, $favoriteGenre: String!) {
    createUser(
      username: $username
      password: $password
      name: $name
      favoriteGenre: $favoriteGenre
    ) {
      username
      name
      favoriteGenre
      id
    }
  }
`);
