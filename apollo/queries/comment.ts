// graphql/comments.ts
import { COMMENT_FRAGMENT } from '@/types/graphql/fragments';
import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      ...CommentFragment
      replies {
        ...CommentFragment
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const GET_COMMENTS_BY_POST = gql`
  query GetCommentsByPost($postId: ID!) {
    commentsByPost(postId: $postId) {
      ...CommentFragment
      replies {
        ...CommentFragment
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: ID!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id)
  }
`;