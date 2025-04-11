// 8. User Info Footer Component
import React from "react";
import { View, Text } from "react-native";
import { Music } from "lucide-react-native";
import { useTheme } from "@/providers/theme-context";

interface UserInfoFooterProps {
  username: string;
  caption: string;
  songName?: string;
  mediaType: "video" | "image";
}

export const UserInfoFooter: React.FC<UserInfoFooterProps> = ({
  username,
  caption,
  songName,
  mediaType,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" ? true : false;
  return (
    <View className="pb-20 px-4">
      <Text className="text-white font-bold mb-2">@{username}</Text>
      <Text className="text-white mb-3">{caption}</Text>
      {mediaType === "video" && songName && (
        <View className="flex-row items-center">
          <Music size={20} color={"white"} />
          <Text className="text-white ml-2">{songName}</Text>
        </View>
      )}
    </View>
  );
};
