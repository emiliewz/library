import resolvers from './resolvers';
import { ApolloServer } from '@apollo/server';
import { readFileSync } from 'fs';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import config from './utils/config';
import { User } from './__generated__/resolvers-types';
import context from './context';

const typeDefs = readFileSync('./src/schema.graphql', { encoding: 'utf-8' });

export interface MyContext {
  user?: User
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message));

startStandaloneServer(server, {
  listen: { port: config.PORT },
  context
})
  .then(({ url }) => console.log(`Server ready at ${url}`))
  .catch(error => console.log(error.message));

