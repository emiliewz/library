import { createClient } from 'graphql-ws';
import { HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context';
import storageService from '../services/storage';
import { useState } from 'react';
import { onError } from '@apollo/client/link/error';

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

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const getSplitLink = () => {
  const httpLink = new HttpLink({
    uri: '/'
  });

  const wsLink = new GraphQLWsLink(createClient({
    url: `${getWebsocketURI()}`
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

const getWebsocketURI = () => {
  const location = window.location;
  const protocol = location.protocol === 'http:' ? 'ws:' : 'wss:';
  return protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
};

type FieldEntry = {
  field: {
    type: string,
    value: string,
    onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void,
  },
  setValue: React.Dispatch<React.SetStateAction<string>>
};

export const useField = (type: string): FieldEntry => {
  const [value, setValue] = useState<string>('');

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  return {
    field: {
      type,
      value,
      onChange
    }, setValue
  };
};
