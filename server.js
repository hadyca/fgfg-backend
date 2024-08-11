import { ApolloServer } from "@apollo/server";
import { typeDefs, resolvers } from "./schema";
import { startStandaloneServer } from "@apollo/server/standalone";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const startServer = async () => {
  try {
    const { url } = await startStandaloneServer(server);
    // await server.start();
    console.log(`🚀 Server is running ${url}`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
