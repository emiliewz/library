import resolvers from './resolvers';
import { ApolloServer } from '@apollo/server';
import { readFileSync } from 'fs';
import mongoose from 'mongoose';
import config from './utils/config';
import { User } from './__generated__/resolvers-types';
import context from './context';

import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { useServer } from 'graphql-ws/lib/use/ws';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';

const typeDefs = readFileSync('./src/schema.graphql', { encoding: 'utf-8' });

export interface MyContext {
  user: User
}

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message));

const main = async () => {
  const app = express();
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        // eslint-disable-next-line @typescript-eslint/require-await
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            }
          };
        }
      }
    ]
  });

  await server.start();

  app.use(
    '/',
    cors(),
    express.static(__dirname + '/dist'),
    express.json(),
    expressMiddleware(server, { context })
  );

  httpServer.listen(config.PORT, () =>
    console.log(`Server is now running on http://localhost:${config.PORT}`)
  );
};

void main();
