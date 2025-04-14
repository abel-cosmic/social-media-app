import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API endpoint
const API_URL = process.env.REACT_NATIVE_BACKEND_API_URL || 'http://localhost:3000';

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// HTTP link
const httpLink = new HttpLink({
  uri: API_URL,
});

// Auth link
const authLink = setContext(async (_, { headers }) => {
  try {
    // Get token from storage
    const token = await AsyncStorage.getItem('authToken');
    
    // Return the headers to the context
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    console.error('Error getting auth token:', error);
    return { headers };
  }
});

// Cache configuration
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getAllPosts: {
          // Merge function for pagination
          keyArgs: false,
          merge(existing = { posts: [] }, incoming) {
            return {
              ...incoming,
              posts: [...(existing.posts || []), ...(incoming.posts || [])],
            };
          },
        },
      },
    },
  },
});

// Create Apollo client
export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
});

export default client;