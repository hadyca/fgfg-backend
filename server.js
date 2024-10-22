require("dotenv").config();
import { ApolloServer } from "@apollo/server";
// import { typeDefs, resolvers } from "./schema";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { getUser } from "./users/users.utils";

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// This final export is important!
// highlight-start
export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
// highlight-end

// const startServer = async () => {
//   try {
//     const { url } = await startStandaloneServer(server, {
//       context: async ({ req }) => {
//         return {
//           loggedInUser: await getUser(req.headers.token),
//         };
//       },
//     });

//     console.log(`🚀 Server is running ${url}`);
//   } catch (error) {
//     console.error("Error starting the server:", error);
//   }
// };

// startServer();
