import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set your GraphQL API endpoint
const API_URL = 'http://your-backend-url:4000/graphql';

// Create an HTTP link
const httpLink = new HttpLink({
  uri: API_URL,
});

// Auth link middleware for adding JWT token to headers
const authLink = setContext(async (_, { headers }) => {
  // Get the token from storage
  const token = await AsyncStorage.getItem('auth_token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo client
export const createApolloClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  });
};

export const client = createApolloClient();