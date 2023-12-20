import { SubscriptionResolvers } from '../__generated__/resolvers-types';
import { PubSub } from 'graphql-subscriptions';
export const pubsub = new PubSub();

const subscriptions: SubscriptionResolvers = {
  bookAdded: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
  }
};

export default subscriptions;