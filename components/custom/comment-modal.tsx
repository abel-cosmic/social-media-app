// components/custom/comment-modal.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { X, Send, Heart } from "lucide-react-native";
import { Comment } from "@/hooks/post";
import { CommentItem } from "@/components/custom/comment-item";
import { useTheme } from "@/providers/theme-context";

interface CommentModalProps {
  visible: boolean;
  comments: Comment[];
  selectedComment: Comment | null;
  onClose: () => void;
  onAddComment: (text: string) => void;
  onAddReply: (text: string, commentId: string) => void;
  onLikeComment: (commentId: string) => void;
  onSelectComment: (comment: Comment | null) => void;
  username: string;
  profilePic: string;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  visible,
  comments,
  selectedComment,
  onClose,
  onAddComment,
  onAddReply,
  onLikeComment,
  onSelectComment,
  username,
  profilePic,
}) => {
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const handleAddReply = () => {
    if (replyText.trim() && selectedComment) {
      onAddReply(replyText, selectedComment.id);
      setReplyText("");
    }
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <CommentItem
      comment={item}
      onSelectComment={onSelectComment}
      onLikeComment={onLikeComment}
    />
  );

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" ? true : false;
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-background">
        <View className="flex-row items-center justify-between p-4">
          <Text className="text-lg text-foreground font-bold">
            {comments.length} comments
          </Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color={isDark ? "white" : "black"} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          className="flex-1 px-8 py-4"
          contentContainerStyle={{ paddingBottom: 16, gap: 10 }}
        />

        <View className="p-4 border mb-8 rounded-xl border-gray-200">
          {selectedComment && (
            <View className="flex-row items-center mb-2">
              <Text className="text-foreground">Replying to </Text>
              <Text className="font-bold text-foreground">
                @{selectedComment.username}
              </Text>
              <TouchableOpacity
                className="ml-auto"
                onPress={() => onSelectComment(null)}
              >
                <X size={16} color="black" />
              </TouchableOpacity>
            </View>
          )}

          <View className="flex-row items-center">
            <Image
              source={{ uri: profilePic }}
              className="w-8 h-8 rounded-full mr-2"
            />
            <TextInput
              className="flex-1 bg-background text-foreground rounded-full px-4 py-2 mr-2"
              placeholder={
                selectedComment ? "Add a reply..." : "Add a comment..."
              }
              value={selectedComment ? replyText : newComment}
              onChangeText={selectedComment ? setReplyText : setNewComment}
              autoFocus={true}
            />
            <TouchableOpacity
              onPress={selectedComment ? handleAddReply : handleAddComment}
            >
              <Send size={24} color="orange" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
