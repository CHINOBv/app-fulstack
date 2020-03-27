import React from "react";

import Routes from "./components/Routes.jsx";

import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  
  //send token Server

  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers:{
        authorization: token
      }
    });
  },

  cache: new InMemoryCache({
    addTypename: false
  }, { connectToDevTools: true }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("Errors gql: ", graphQLErrors);
    console.log("Errors NetWork: ", networkError);
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
