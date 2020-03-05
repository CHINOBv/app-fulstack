import React from "react";

import Routes from "./components/Routes.jsx";

import { ApolloProvider } from "react-apollo";
import ApolloClient,{ InMemoryCache} from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename:false
  }),
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
