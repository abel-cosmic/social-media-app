// hooks/useComments.ts
import { GET_COMMENTS_BY_POST, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from '@/apollo/queries/comment';
import { useMutation, useQuery } from '@apollo/client';

// Type for comment input
interface CommentInput {
  postId: string;
  content: string;
  parentId?: string;
}

export const useComments = (postId?: string) => {
  // Get comments by post query
  const { 
    data: commentsData, 
    loading: commentsLoading, 
    error: commentsError, 
    refetch: refetchComments 
  } = useQuery(GET_COMMENTS_BY_POST, {
    variables: { postId },
    skip: !postId,
  });

  // Create comment mutation
  const [createCommentMutation, { loading: createLoading }] = useMutation(CREATE_COMMENT, {
    refetchQueries: postId ? [{ 
      query: GET_COMMENTS_BY_POST, 
      variables: { postId } 
    }] : [],
  });

  // Update comment mutation
  const [updateCommentMutation, { loading: updateLoading }] = useMutation(UPDATE_COMMENT, {
    refetchQueries: postId ? [{ 
      query: GET_COMMENTS_BY_POST, 
      variables: { postId } 
    }] : [],
  });

  // Delete comment mutation
  const [deleteCommentMutation, { loading: deleteLoading }] = useMutation(DELETE_COMMENT, {
    refetchQueries: postId ? [{ 
      query: GET_COMMENTS_BY_POST, 
      variables: { postId } 
    }] : [],
  });

  // Create comment function
  const createComment = async (input: CommentInput) => {
    try {
      const { data } = await createCommentMutation({
        variables: { input },
      });
      return { success: true, comment: data.createComment };
    } catch (error) {
      console.error('Create comment error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  // Create reply function
  const createReply = async (postId: string, content: string, parentId: string) => {
    return createComment({ postId, content, parentId });
  };

  // Update comment function
  const updateComment = async (id: string, content: string) => {
    try {
      const { data } = await updateCommentMutation({
        variables: { id, input: { content } },
      });
      return { success: true, comment: data.updateComment };
    } catch (error) {
      console.error('Update comment error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  // Delete comment function
  const deleteComment = async (id: string) => {
    try {
      await deleteCommentMutation({
        variables: { id },
      });
      return { success: true };
    } catch (error) {
      console.error('Delete comment error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  return {
    comments: commentsData?.commentsByPost || [],
    loading: commentsLoading || createLoading || updateLoading || deleteLoading,
    error: commentsError,
    refetchComments,
    createComment,
    createReply,
    updateComment,
    deleteComment,
  };
};