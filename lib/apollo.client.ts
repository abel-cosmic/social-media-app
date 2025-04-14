// lib/apollo-client.ts
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    from
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import AsyncStorage from "@react-native-async-storage/async-storage";
  
  // Create an HTTP link
  const httpLink = createHttpLink({
    uri: "https://your-graphql-endpoint.com/graphql", // Replace with your actual GraphQL endpoint
  });
  
  // Error handling link
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  
  // Authentication link
  const authLink = setContext(async (_, { headers }) => {
    // Get the authentication token from AsyncStorage
    const token = await AsyncStorage.getItem("authToken");
    
    // Return the headers to the context
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    };
  });
  
  // Create Apollo Client
  export const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  });