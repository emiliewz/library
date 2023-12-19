import resolvers from './resolvers';
import { ApolloServer, BaseContext } from '@apollo/server';
import { readFileSync } from 'fs';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import config from './utils/config';

const typeDefs = readFileSync('./src/schema.graphql', { encoding: 'utf-8' });

const server: ApolloServer<BaseContext> = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message));

startStandaloneServer(server, { listen: { port: config.PORT } })
  .then(({ url }) => console.log(`Server ready at ${url}`))
  .catch(error => console.log(error.message));

