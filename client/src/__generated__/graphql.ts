/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Author = {
  __typename?: 'Author';
  bookCount: Scalars['Int']['output'];
  books: Array<Book>;
  born?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Book = {
  __typename?: 'Book';
  author: Author;
  genres: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  published: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook?: Maybe<Book>;
  createUser?: Maybe<User>;
  editAuthor?: Maybe<Author>;
  login?: Maybe<Token>;
};


export type MutationAddBookArgs = {
  author: Scalars['String']['input'];
  genres: Array<Scalars['String']['input']>;
  published: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  favoriteGenre: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationEditAuthorArgs = {
  name: Scalars['String']['input'];
  setBornTo: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allAuthors: Array<Author>;
  allBooks: Array<Book>;
  authorCount: Scalars['Int']['output'];
  bookCount: Scalars['Int']['output'];
  me?: Maybe<User>;
};


export type QueryAllBooksArgs = {
  author?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  bookAdded?: Maybe<Book>;
};

export type Token = {
  __typename?: 'Token';
  name: Scalars['String']['output'];
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  favoriteGenre: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type EditBirthYearMutationVariables = Exact<{
  name: Scalars['String']['input'];
  born: Scalars['Int']['input'];
}>;


export type EditBirthYearMutation = { __typename?: 'Mutation', editAuthor?: { __typename?: 'Author', name: string, id: string, born?: number | null, bookCount: number } | null };

export type GetAllAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAuthorsQuery = { __typename?: 'Query', allAuthors: Array<{ __typename?: 'Author', name: string, id: string, born?: number | null, bookCount: number }> };

export type GetAllBooksQueryVariables = Exact<{
  author?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllBooksQuery = { __typename?: 'Query', allBooks: Array<{ __typename?: 'Book', title: string, published: number, id: string, genres: Array<string>, author: { __typename?: 'Author', name: string, born?: number | null } }> };

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login?: { __typename?: 'Token', username: string, token: string, name: string } | null };

export type AddBookMutationVariables = Exact<{
  title: Scalars['String']['input'];
  published: Scalars['Int']['input'];
  author: Scalars['String']['input'];
  genres: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AddBookMutation = { __typename?: 'Mutation', addBook?: { __typename?: 'Book', title: string, published: number, id: string, genres: Array<string>, author: { __typename?: 'Author', name: string, born?: number | null } } | null };


export const EditBirthYearDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EditBirthYear" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "born" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "editAuthor" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "name" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "setBornTo" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "born" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "born" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bookCount" } }] } }] } }] } as unknown as DocumentNode<EditBirthYearMutation, EditBirthYearMutationVariables>;
export const GetAllAuthorsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetAllAuthors" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "allAuthors" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "born" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bookCount" } }] } }] } }] } as unknown as DocumentNode<GetAllAuthorsQuery, GetAllAuthorsQueryVariables>;
export const GetAllBooksDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetAllBooks" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "author" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "genre" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "allBooks" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "author" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "author" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "genre" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "genre" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "published" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "born" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "genres" } }] } }] } }] } as unknown as DocumentNode<GetAllBooksQuery, GetAllBooksQueryVariables>;
export const LoginUserDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "LoginUser" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "password" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "login" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "username" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "password" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "password" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "token" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } }] } as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const AddBookDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AddBook" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "title" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "published" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "author" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "genres" } }, "type": { "kind": "NonNullType", "type": { "kind": "ListType", "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "addBook" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "title" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "title" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "published" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "published" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "author" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "author" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "genres" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "genres" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "published" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "born" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "genres" } }] } }] } }] } as unknown as DocumentNode<AddBookMutation, AddBookMutationVariables>;