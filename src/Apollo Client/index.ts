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
import * as config from "../../config";
export type ProcessEnvType = "test" | "production" | "development";

export type InitializeApolloClient = (
  env: ProcessEnvType,
  customHttpLinkUri?: string
) => {
  client: ApolloClient<NormalizedCacheObject>;
  cache: InMemoryCache;
};

const initializeApolloCache = (env: ProcessEnvType): InMemoryCache => {
  const cache = new InMemoryCache({
    addTypename: env !== "test",
    typePolicies: {
      Query: {
        fields: {
          search: {
            merge(existing, incoming) {
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
      Issue: {
        fields: {
          edges: {
            merge(existing, incoming) {
              let issues: Reference[] = [];
              if (existing && existing.issues) {
                issues = issues.concat(existing.issues);
              }
              if (incoming && incoming.issues) {
                issues = issues.concat(incoming.issues);
              }
              return {
                ...incoming,
                issues,
              };
            },
          },
        },
      },
    },
  });
  return cache;
};

export const initializeApolloClient: InitializeApolloClient = (
  env,
  customHttpLinkUri
) => {
  const cache = initializeApolloCache(env);
  const API_URL = config.API_URL;
  const TOKEN = "bearer " + config.TOKEN;

  const client = ["production", "development"].includes(env)
    ? new ApolloClient({
        defaultOptions: {
          watchQuery: {
            fetchPolicy: "cache-and-network",
          },
        },
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
                Authorization: TOKEN || "",
              },
            };
          }),
          new HttpLink({
            uri: customHttpLinkUri || API_URL,
            credentials: "same-origin",
          }),
        ]),
        cache,
      })
    : null;

  return {
    client,
    cache,
  };
};