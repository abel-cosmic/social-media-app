import { USER_FRAGMENT } from '@/types/graphql/fragments';
import { gql } from '@apollo/client';


// User registration mutation
export const REGISTER_USER = gql`
  ${USER_FRAGMENT}
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        ...UserFragment
      }
    }
  }
`;

// User login mutation
export const LOGIN_USER = gql`
  ${USER_FRAGMENT}
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        ...UserFragment
      }
    }
  }
`;

// Current user query
export const CURRENT_USER = gql`
  ${USER_FRAGMENT}
  query CurrentUser {
    currentUser {
      ...UserFragment
    }
  }
`;

// Update user mutation
export const UPDATE_USER = gql`
  ${USER_FRAGMENT}
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...UserFragment
    }
  }
`;

// Delete user mutation
export const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser
  }
`;