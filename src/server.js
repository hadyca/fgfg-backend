require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { typeDefs, resolvers } from "./schema";
import { startStandaloneServer } from "@apollo/server/standalone";

import { getUser } from "./users/users.utils";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => {
        return {
          loggedInUser: await getUser(req.headers.token),
        };
      },
    });

    console.log(`🚀 Server is running ${url}`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
