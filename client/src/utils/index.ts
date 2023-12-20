import { HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

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
    httpLink,
  );

  return splitLink;
};
