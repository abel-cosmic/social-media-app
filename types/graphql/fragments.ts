// graphql/types.ts
import { gql } from '@apollo/client';

// User related types
export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    email
    bio
    profilePicture
    createdAt
  }
`;

// Post related types
export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    mediaFile
    caption
    createdAt
    updatedAt
    likesCount
    averageRating
  }
`;

// Comment related types
export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    content
    createdAt
    user {
      id
      username
      profilePicture
    }
  }
`;