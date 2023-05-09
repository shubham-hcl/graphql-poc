import express from "express";
import cors from "cors";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import validateUser from "./validateUser";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from 'body-parser'

// Create an express server and a GraphQL endpoint
const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  csrfPrevention: false,
});

const databaseUrl =
  "mongodb+srv://shubhamkaushik90:x4V6PsSm2BzHbo96@graphqlcluster.yahfjz1.mongodb.net/?retryWrites=true&w=majority";

const startServer = async () => {
  await mongoose.connect(databaseUrl);
  await server.start();
  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: validateUser,
    })
  );
  app.listen(4000, () => console.log("Server started on port 4000"));
};

startServer();
