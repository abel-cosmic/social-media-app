// hooks/usePosts.ts
import { GET_ALL_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, UNLIKE_POST, RATE_POST, GET_POST } from '@/apollo/queries/post';
import { useMutation, useQuery } from '@apollo/client';


// Type for post input
interface PostInput {
  mediaFile: string;
  caption?: string;
}

export const usePosts = () => {
  // Get all posts query
  const { 
    data: postsData, 
    loading: postsLoading, 
    error: postsError, 
    refetch: refetchPosts 
  } = useQuery(GET_ALL_POSTS);

  // Create post mutation
  const [createPostMutation, { loading: createLoading }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  // Update post mutation
  const [updatePostMutation, { loading: updateLoading }] = useMutation(UPDATE_POST);

  // Delete post mutation
  const [deletePostMutation, { loading: deleteLoading }] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  // Like post mutation
  const [likePostMutation] = useMutation(LIKE_POST);

  // Unlike post mutation
  const [unlikePostMutation] = useMutation(UNLIKE_POST);

  // Rate post mutation
  const [ratePostMutation] = useMutation(RATE_POST);

  // Create post function
  const createPost = async (input: PostInput) => {
    try {
      const { data } = await createPostMutation({
        variables: { input },
      });
      return { success: true, post: data.createPost };
    } catch (error) {
      console.error('Create post error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  // Update post function
  const updatePost = async (id: string, input: Partial<PostInput>) => {
    try {
      const { data } = await updatePostMutation({
        variables: { id, input },
      });
      return { success: true, post: data.updatePost };
    } catch (error) {
      console.error('Update post error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  // Delete post function
  const deletePost = async (id: string) => {
    try {
      await deletePostMutation({
        variables: { id },
      });
      return { success: true };
    } catch (error) {
      console.error('Delete post error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  // Like post function
  const likePost = async (postId: string) => {
    try {
      await likePostMutation({
        variables: { postId },
        refetchQueries: [{ query: GET_ALL_POSTS }],
      });
      return { success: true };
    } catch (error) {
      console.error('Like post error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  // Unlike post function
  const unlikePost = async (postId: string) => {
    try {
      await unlikePostMutation({
        variables: { postId },
        refetchQueries: [{ query: GET_ALL_POSTS }],
      });
      return { success: true };
    } catch (error) {
      console.error('Unlike post error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  // Rate post function
  const ratePost = async (postId: string, value: number) => {
    try {
      if (value < 1 || value > 5) {
        throw new Error('Rating must be between 1 and 5');
      }
      
      await ratePostMutation({
        variables: { postId, value },
        refetchQueries: [{ query: GET_ALL_POSTS }],
      });
      return { success: true };
    } catch (error) {
      console.error('Rate post error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  // Get single post hook
  const usePost = (postId: string) => {
    const { data, loading, error, refetch } = useQuery(GET_POST, {
      variables: { id: postId },
      skip: !postId,
    });

    return {
      post: data?.post,
      loading,
      error,
      refetch,
    };
  };

  return {
    posts: postsData?.posts || [],
    loading: postsLoading || createLoading || updateLoading || deleteLoading,
    error: postsError,
    refetchPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    ratePost,
    usePost,
  };
};