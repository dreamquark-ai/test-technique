// Libs
import { ApolloServer } from "apollo-server";

// Graph
import { schema, resolvers } from "./graph";
import { userDatasource, teamDatasource } from "./datasources";

export const server = new ApolloServer({
    resolvers,
    typeDefs: schema,
    dataSources: () => ({
        user: userDatasource(),
        team: teamDatasource(),
    }),
});
