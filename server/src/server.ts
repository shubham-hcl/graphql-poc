import express from 'express';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import expressPlayground from 'graphql-playground-middleware-express';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import mongoose from 'mongoose';

// Create an express server and a GraphQL endpoint
const app = express();

app.use(cors())

// Create Graph QL Endpoint
app.use('/graphql', createHandler({
    schema: schema,
    rootValue: resolvers
}));

app.use('/playground', expressPlayground({ endpoint: '/graphql' }));

const databaseUrl = "mongodb+srv://shubhamkaushik90:x4V6PsSm2BzHbo96@graphqlcluster.yahfjz1.mongodb.net/?retryWrites=true&w=majority";

const start = async () => {
    try {
      await mongoose.connect(databaseUrl);
      app.listen(4000, () => console.log("Server started on port 4000"));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
start();