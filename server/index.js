import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './data/resolvers.js'
import { typeDefs } from "./data/eschema.js";
const app = express();

const server = new ApolloServer({ typeDefs, resolvers});

server.applyMiddleware({ app });

app.listen({port: 4000},() => console.log(`Server Runing ${server.graphqlPath}`));