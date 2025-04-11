// hooks/post.ts
import { useState } from "react";

export interface Comment {
  id: string;
  username: string;
  profilePic: string;
  text: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

interface PostStateProps {
  initialLikes: number;
  initialComments: Comment[];
  initialBookmarks: number;
}

export const usePostState = ({
  initialLikes = 0,
  initialComments = [],
  initialBookmarks = 0,
}: Partial<PostStateProps>) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [comments, setComments] = useState(initialComments);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setBookmarks(isBookmarked ? bookmarks - 1 : bookmarks + 1);
  };

  const handleAddComment = (text: string) => {
    if (text.trim()) {
      const newCommentObj = {
        id: Date.now().toString(),
        username: "currentUser",
        profilePic: "https://placeholder.com/user",
        text: text,
        timestamp: "now",
        likes: 0,
        replies: [],
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };

  const handleAddReply = (text: string, commentId: string) => {
    if (text.trim()) {
      const newReply = {
        id: Date.now().toString(),
        username: "currentUser",
        profilePic: "https://placeholder.com/user",
        text: text,
        timestamp: "now",
        likes: 0,
      };

      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        return comment;
      });

      setComments(updatedComments);
      setReplyText("");
      setSelectedComment(null);
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        return comment;
      })
    );
  };

  return {
    isLiked,
    isBookmarked,
    likes,
    bookmarks,
    comments,
    commentModalVisible,
    newComment,
    selectedComment,
    replyText,
    setNewComment,
    setReplyText,
    setCommentModalVisible,
    setSelectedComment,
    handleLike,
    handleBookmark,
    handleAddComment,
    handleAddReply,
    handleLikeComment,
  };
};