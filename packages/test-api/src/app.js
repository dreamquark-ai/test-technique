// Libs
import { ApolloServer } from "apollo-server";

import { schema, resolvers } from "./graph";

export const server = new ApolloServer({
    resolvers,
    typeDefs: schema,
});
