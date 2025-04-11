// components/custom/comment-item.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Heart } from "lucide-react-native";
import { Comment } from "@/hooks/post";

interface CommentItemProps {
  comment: Comment;
  onSelectComment: (comment: Comment | null) => void;
  onLikeComment: (commentId: string) => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onSelectComment,
  onLikeComment,
}) => {
  return (
    <View className="py-4 border px-4 border-zinc-200 rounded-xl">
      <View className="flex-row">
        <Image
          source={{ uri: comment.profilePic }}
          className="w-10 h-10 rounded-full"
        />
        <View className="ml-3 flex-1">
          <Text className="font-bold  text-foreground text-sm">{comment.username}</Text>
          <Text className="text-sm text-foreground my-1">{comment.text}</Text>
          <View className="flex-row items-center">
            <Text className="text-foreground text-xs mr-4">
              {comment.timestamp}
            </Text>
            <TouchableOpacity
              className="mr-4"
              onPress={() => onSelectComment(comment)}
            >
              <Text className="text-foreground text-xs">Reply</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onLikeComment(comment.id)}>
              <Heart
                size={16}
                fill={comment.likes > 0 ? "red" : "none"}
                color={comment.likes > 0 ? "red" : "gray"}
              />
              {comment.likes > 0 && (
                <Text className="text-xs text-foreground ml-1">
                  {comment.likes}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {comment.replies && comment.replies.length > 0 && (
            <View className="mt-3 ml-3">
              {comment.replies.map((reply) => (
                <View key={reply.id} className="flex-row mt-3">
                  <Image
                    source={{ uri: reply.profilePic }}
                    className="w-8 h-8 rounded-full"
                  />
                  <View className="ml-2 flex-1">
                    <Text className="font-bold text-foreground text-xs">
                      {reply.username}
                    </Text>
                    <Text className="text-xs text-foreground my-1">
                      {reply.text}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-foreground text-xs mr-3">
                        {reply.timestamp}
                      </Text>
                      <TouchableOpacity onPress={() => onLikeComment(reply.id)}>
                        <Heart
                          size={14}
                          fill={reply.likes > 0 ? "red" : "none"}
                          color={reply.likes > 0 ? "red" : "gray"}
                        />
                        {reply.likes > 0 && (
                          <Text className="text-xs text-foreground ml-1">
                            {reply.likes}
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
