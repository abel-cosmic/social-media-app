// components/custom/post.tsx
import { ActionBar } from "@/components/custom/action-bar";
import { CommentModal } from "@/components/custom/comment-modal";
import { ImageViewer } from "@/components/custom/image-player";
import { UserInfoFooter } from "@/components/custom/user-info";
import { VideoPlayer } from "@/components/custom/video-player";
import { usePostState, Comment } from "@/hooks/post";
import React from "react";
 //@ts-ignore
import { Dimensions, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface TikTokPostProps {
  mediaUri: string;
  mediaType: "video" | "image";
  username: string;
  profilePic: string;
  caption: string;
  songName?: string;
  likes: number;
  comments: Comment[];
  bookmarks: number;
  isActive?: boolean;
}

const TikTokPost: React.FC<TikTokPostProps> = ({
  mediaUri,
  mediaType,
  username,
  profilePic,
  caption,
  songName,
  likes: initialLikes = 0,
  comments: initialComments = [],
  bookmarks: initialBookmarks = 0,
  isActive = false,
}) => {
  const {
    isLiked,
    isBookmarked,
    likes,
    bookmarks,
    comments,
    commentModalVisible,
    selectedComment,
    handleLike,
    handleBookmark,
    handleAddComment,
    handleAddReply,
    handleLikeComment,
    setCommentModalVisible,
    setSelectedComment,
  } = usePostState({
    initialLikes,
    initialComments,
    initialBookmarks,
  });

  const renderMedia = () => {
    if (mediaType === "video") {
      return <VideoPlayer uri={mediaUri} isActive={isActive} />;
    } else {
      return <ImageViewer uri={mediaUri} />;
    }
  };

  return (
    <View
      style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
      className="relative"
    >
      <View className="absolute inset-0">{renderMedia()}</View>

      <View className="absolute bottom-0 left-2 right-16">
        <UserInfoFooter
          username={username}
          caption={caption}
          mediaType="image"
          songName={songName}
        />
      </View>

      <ActionBar
        profilePic={profilePic}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
        likes={likes}
        comments={comments.length}
        bookmarks={bookmarks}
        songName={songName}
        mediaType={mediaType}
        onLike={handleLike}
        onBookmark={handleBookmark}
        onCommentPress={() => setCommentModalVisible(true)}
      />

      <CommentModal
        visible={commentModalVisible}
        comments={comments}
        selectedComment={selectedComment}
        onClose={() => setCommentModalVisible(false)}
        onAddComment={handleAddComment}
        onAddReply={handleAddReply}
        onLikeComment={handleLikeComment}
        onSelectComment={setSelectedComment}
        username={username}
        profilePic={profilePic}
      />
    </View>
  );
};

export default TikTokPost;
