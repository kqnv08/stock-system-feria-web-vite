import {
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { onError } from "@apollo/client/link/error";

const getApiUrlBase = () => import.meta.env.VITE_API_URL_BASE;
const httpLink = createHttpLink({
  uri: `${getApiUrlBase()}/graphql`,
});

const wsLink = (token: string) => new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.VITE_API_URL_WS}`,
    connectionParams: {
      authorization: token,
    }
  })
);

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
}));


export const errorLink = (showError: any) => onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions }) => {
      if (extensions?.code === "UNAUTHENTICATED") {
        localStorage.clear();
        window.location.href = "/login"
      } else {
        showError()
      }
    })
  }
})

export const splitLink = (token: string) => split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink(token),
  authLink.concat(httpLink)
);

