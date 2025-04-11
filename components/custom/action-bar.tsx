// components/custom/action-bar.tsx
import { MusicDisc } from "@/components/custom/music-disc";
import { formatNumber } from "@/lib/utils";
import { Bookmark, Heart, MessageCircle } from "lucide-react-native";
import React from "react";
 //@ts-ignore
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ActionBarProps {
  profilePic: string;
  likes: number;
  comments: number;
  bookmarks: number;
  isLiked: boolean;
  isBookmarked: boolean;
  songName?: string;
  mediaType: "video" | "image";
  onLike: () => void;
  onBookmark: () => void;
  onCommentPress: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  profilePic,
  likes,
  comments,
  bookmarks,
  isLiked,
  isBookmarked,
  songName,
  mediaType,
  onLike,
  onBookmark,
  onCommentPress,
}) => {
  return (
    <View className="absolute right-4 bottom-32 items-center">
      <View className="items-center mb-6">
        <Image
          source={{ uri: profilePic }}
          className="w-12 h-12 rounded-full border border-white"
        />
      </View>

      <TouchableOpacity className="items-center mb-5" onPress={onLike}>
        <Heart
          size={35}
          fill={isLiked ? "red" : "none"}
          color={isLiked ? "red" : "white"}
        />
        <Text className="text-white text-xs mt-1">{formatNumber(likes)}</Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center mb-5" onPress={onCommentPress}>
        <MessageCircle size={35} color="white" />
        <Text className="text-white text-xs mt-1">
          {formatNumber(comments)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center mb-5" onPress={onBookmark}>
        <Bookmark
          size={35}
          fill={isBookmarked ? "white" : "none"}
          color="white"
        />
        <Text className="text-white text-xs mt-1">
          {formatNumber(bookmarks)}
        </Text>
      </TouchableOpacity>

      {mediaType === "video" && songName && <MusicDisc />}
    </View>
  );
};