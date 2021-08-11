import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const uri = "http://80.209.237.197:3000/graphql";
// const uri = "http://localhost:3001/graphql";

const httpLink = createHttpLink({
  uri,
});

const authLink = (token?: string) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      token,
    },
  }));

export const client = (token?: string) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    credentials: "include",
    link: authLink(token).concat(httpLink),
  });
