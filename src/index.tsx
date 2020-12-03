import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initializeApolloClient } from "./Apollo Client";
import { ApolloProvider } from "@apollo/client";

const { client } = initializeApolloClient();
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
