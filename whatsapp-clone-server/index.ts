import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import schema from './schema';

const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  const server = new ApolloServer({ schema });
  await server.start();

  server.applyMiddleware({
    app,
    path: '/graphql',
  });
}
startServer();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
