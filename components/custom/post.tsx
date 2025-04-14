// components/custom/post.tsx
import { LIKE_POST, UNLIKE_POST } from "@/apollo/queries/post";
import { ActionBar } from "@/components/custom/action-bar";
import { CommentModal } from "@/components/custom/comment-modal";
import { ImageViewer } from "@/components/custom/image-player";
import { UserInfoFooter } from "@/components/custom/user-info";
import { VideoPlayer } from "@/components/custom/video-player";
import { useComments } from "@/hooks/graphql/comment";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";

interface TikTokPostProps {
  id: string;
  mediaUri: string;
  mediaType: "video" | "image";
  username: string;
  profilePic: string;
  caption: string;
  songName?: string;
  likes: number;
  bookmarks: number;
  isActive?: boolean;
}

export default function TikTokPost({
  id,
  mediaUri,
  mediaType,
  username,
  profilePic,
  caption,
  songName,
  likes: initialLikes,
  bookmarks: initialBookmarks,
  isActive = false,
}: TikTokPostProps) {
  // State for UI components
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  
  // Apollo mutations
  const [likePostMutation] = useMutation(LIKE_POST);
  const [unlikePostMutation] = useMutation(UNLIKE_POST);
  
  // Comments hook
  const {
    comments,
    loading: commentsLoading,
    createComment,
    createReply,
    deleteComment
  } = useComments(id);
  
  // Selected comment for replying
  const [selectedComment, setSelectedComment] = useState(null);

  // Handle like post
  const handleLike = async () => {
    try {
      if (isLiked) {
        await unlikePostMutation({ variables: { postId: id } });
        setLikes(prev => Math.max(0, prev - 1));
      } else {
        await likePostMutation({ variables: { postId: id } });
        setLikes(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Handle bookmark post
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setBookmarks(isBookmarked ? bookmarks - 1 : bookmarks + 1);
  };

  // Handle add comment
  const handleAddComment = async (text: string) => {
    try {
      await createComment({
        postId: id,
        content: text
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Handle add reply
  const handleAddReply = async (text: string, commentId: string) => {
    try {
      await createReply(id, text, commentId);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  // Handle like comment (implement if backend supports it)
  const handleLikeComment = (commentId: string) => {
    console.log("Like comment:", commentId);
    // Implementation would go here if backend supports it
  };

  // Screen dimensions for layout
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  return (
    <View style={{ width: screenWidth, height: screenHeight }}>
      {mediaType === "video" && (
        <VideoPlayer uri={mediaUri} isActive={isActive} />
      )}

      {mediaType === "image" && <ImageViewer uri={mediaUri} />}

      <UserInfoFooter
        username={username}
        caption={caption}
        songName={songName}
        mediaType={mediaType}
      />

      <ActionBar
        profilePic={profilePic}
        likes={likes}
        comments={comments?.length || 0}
        bookmarks={bookmarks}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
        songName={songName}
        mediaType={mediaType}
        onLike={handleLike}
        onBookmark={handleBookmark}
        onCommentPress={() => setIsCommentModalVisible(true)}
      />

      <CommentModal
        visible={isCommentModalVisible}
        comments={comments || []}
        selectedComment={selectedComment}
        onClose={() => setIsCommentModalVisible(false)}
        onAddComment={handleAddComment}
        onAddReply={handleAddReply}
        onLikeComment={handleLikeComment}
        onSelectComment={setSelectedComment}
        username={username}
        profilePic={profilePic}
      />
    </View>
  );
}