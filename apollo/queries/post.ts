// graphql/posts.ts
import { POST_FRAGMENT, USER_FRAGMENT, COMMENT_FRAGMENT } from '@/types/graphql/fragments';
import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      ...PostFragment
      user {
        ...UserFragment
      }
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      ...PostFragment
      user {
        ...UserFragment
      }
      comments {
        ...CommentFragment
        replies {
          ...CommentFragment
        }
      }
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostFragment
      user {
        ...UserFragment
      }
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation UnlikePost($postId: ID!) {
    unlikePost(postId: $postId)
  }
`;

export const RATE_POST = gql`
  mutation RatePost($postId: ID!, $value: Int!) {
    ratePost(postId: $postId, value: $value) {
      id
      value
    }
  }
`;