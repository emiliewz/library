import { createClient } from 'graphql-ws';
import { HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context';
import storageService from '../services/storage';

const authLink = setContext((_, { headers }) => {
  const token = storageService.getToken();
  const authorization = token ? `Bearer ${token}` : '';

  return {
    headers: {
      ...headers,
      authorization
    }
  };
});

export const getSplitLink = () => {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000'
  });

  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000'
  }));

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink),
  );

  return splitLink;
};
