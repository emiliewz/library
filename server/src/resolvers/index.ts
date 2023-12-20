import { Resolvers } from '../__generated__/resolvers-types';
import Query from './queries';
import Mutation from './mutations';
import Subscription from './subscriptions';

const resolvers: Resolvers = {
  Query, Mutation, Subscription
};

export default resolvers;