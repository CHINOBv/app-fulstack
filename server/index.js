import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './data/resolvers.js'
import fs from 'fs';

const typeDefs = fs.readFileSync("./data/schema.gql", "utf8");

const app = express();

const server = new ApolloServer({ typeDefs, resolvers, context: async({req}) => {
	//Get Token
	const token = req.headers['authorization'];
	console.log(token)
} });

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`Server Runing ${server.graphqlPath}`));