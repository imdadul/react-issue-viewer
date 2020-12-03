import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
  Reference,
} from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

export type InitializeApolloClient = () => {
  client: ApolloClient<NormalizedCacheObject>;
  cache: InMemoryCache;
};

const initializeApolloCache = (): InMemoryCache => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          search: {
            merge(existing, incoming) {
              // when fetchPolicy: "cache-and-network",
              // this merge function needs to merge old and new items,
              // making sure the order of new items
              // and update cursor information for more query
              let issues: Reference[] = [];
              if (existing && existing.edges) {
                issues = issues.concat(existing.edges);
              }
              if (incoming && incoming.edges) {
                issues = issues.concat(incoming.edges);
              }
              return {
                ...incoming,
                edges: issues,
              };
            },
          },
        },
      },
    },
  });
  return cache;
};

export const initializeApolloClient: InitializeApolloClient = () => {
  const cache = initializeApolloCache();
  const API_URL = process.env.API_URL;
  const TOKEN = "bearer " + process.env.TOKEN;

  const client =  new ApolloClient({
        // defaultOptions: {
        //   watchQuery: {
        //     fetchPolicy: "cache-and-network",
        //   },
        // },
        link: ApolloLink.from([
          onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
              graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(
                  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
              );
            if (networkError) console.log(`[Network error]: ${networkError}`);
          }),
          setContext((_, { headers }) => {
            // return the headers to the context so httpLink can read them
            return {
              headers: {
                ...headers,
                Authorization: TOKEN,
              },
            };
          }),
          new HttpLink({
            uri: API_URL,
            credentials: "same-origin",
          }),
        ]),
        cache,
      })

  return {
    client,
    cache,
  };
};
