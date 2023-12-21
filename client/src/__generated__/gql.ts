/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation EditBirthYear($name: String!, $born: Int!){\n    editAuthor(\n      name: $name\n      setBornTo: $born\n    ) {\n      name\n      id\n      born\n      bookCount\n    }\n  }\n": types.EditBirthYearDocument,
    "\n  query GetAllAuthors {\n    allAuthors {\n      name\n      id\n      born\n      bookCount\n    }\n  }\n": types.GetAllAuthorsDocument,
    "\n  query GetAllBooks($author: String, $genre: String) {\n    allBooks(author: $author, genre: $genre ) {\n      title\n      published\n      author {\n        name\n        born\n      }\n      id\n      genres\n    }\n  }\n": types.GetAllBooksDocument,
    "\n  mutation LoginUser($username: String!, $password: String!) {\n    login(\n      username: $username\n      password: $password\n    ) {\n      username\n      token\n      name\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {\n    addBook(\n      title: $title,\n      published: $published,\n      author: $author,\n      genres: $genres\n    ) {\n      title\n      published\n      author {\n        name\n        born\n      }\n      id\n      genres\n    }\n  }\n": types.AddBookDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditBirthYear($name: String!, $born: Int!){\n    editAuthor(\n      name: $name\n      setBornTo: $born\n    ) {\n      name\n      id\n      born\n      bookCount\n    }\n  }\n"): (typeof documents)["\n  mutation EditBirthYear($name: String!, $born: Int!){\n    editAuthor(\n      name: $name\n      setBornTo: $born\n    ) {\n      name\n      id\n      born\n      bookCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllAuthors {\n    allAuthors {\n      name\n      id\n      born\n      bookCount\n    }\n  }\n"): (typeof documents)["\n  query GetAllAuthors {\n    allAuthors {\n      name\n      id\n      born\n      bookCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllBooks($author: String, $genre: String) {\n    allBooks(author: $author, genre: $genre ) {\n      title\n      published\n      author {\n        name\n        born\n      }\n      id\n      genres\n    }\n  }\n"): (typeof documents)["\n  query GetAllBooks($author: String, $genre: String) {\n    allBooks(author: $author, genre: $genre ) {\n      title\n      published\n      author {\n        name\n        born\n      }\n      id\n      genres\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LoginUser($username: String!, $password: String!) {\n    login(\n      username: $username\n      password: $password\n    ) {\n      username\n      token\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($username: String!, $password: String!) {\n    login(\n      username: $username\n      password: $password\n    ) {\n      username\n      token\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {\n    addBook(\n      title: $title,\n      published: $published,\n      author: $author,\n      genres: $genres\n    ) {\n      title\n      published\n      author {\n        name\n        born\n      }\n      id\n      genres\n    }\n  }\n"): (typeof documents)["\n  mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {\n    addBook(\n      title: $title,\n      published: $published,\n      author: $author,\n      genres: $genres\n    ) {\n      title\n      published\n      author {\n        name\n        born\n      }\n      id\n      genres\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;