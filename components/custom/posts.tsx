import { useTheme } from "@/providers/theme-context";
import { Post } from "@/types";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import React, { useRef, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";

interface PostsProps {
  post: Post;
  isVisible?: boolean;
}

const TikTokPost: React.FC<PostsProps> = ({ post, isVisible = true }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const [paused, setPaused] = useState(!isVisible);
  const [currentPost, setCurrentPost] = useState(post);
  const [isLiked, setIsLiked] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const videoRef = useRef(null);

  // Handle play/pause
  const onPlayPausePress = () => {
    setPaused(!paused);
    setShowPlayIcon(true);
    
    // Hide icon after timeout
    setTimeout(() => {
      setShowPlayIcon(false);
    }, 800);
  };

  // Handle like action
  const onLikePressed = () => {
    const likesToAdd = isLiked ? -1 : 1;
    setCurrentPost(prev => ({
      ...prev,
      likes: prev.likes + likesToAdd,
    }));
    setIsLiked(!isLiked);
  };

  // Format numbers for display
  const formatCount = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // Avoid unnecessary re-renders
  React.useEffect(() => {
    setPaused(!isVisible);
  }, [isVisible]);

  return (
    <View 
      className={`${isDark ? "bg-black" : "bg-black"}`}
      style={{ width: windowWidth, height: windowHeight }}
    >
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <View className="flex-1 relative">
          {/* Video Player */}
          <Video
            ref={videoRef}
            source={{ uri: currentPost.videoUri }}
            className="absolute top-0 left-0 bottom-0 right-0"
            resizeMode={ResizeMode.COVER}
            shouldPlay={isVisible && !paused}
            isLooping
            volume={1.0}
          />

          {/* Play/Pause Indicator */}
          {showPlayIcon && (
            <View className="absolute inset-0 items-center justify-center">
              <View className="bg-black/40 rounded-full p-5">
                <Ionicons
                  name={paused ? "play" : "pause"}
                  size={48}
                  color="white"
                />
              </View>
            </View>
          )}

          {/* Right Action Buttons */}
          <View className="absolute right-2 bottom-44 items-center space-y-5">
            {/* Profile */}
            <TouchableOpacity className="items-center mb-2">
              <View className="relative">
                <Image
                  source={{
                    uri: currentPost.user?.imageUri || "https://via.placeholder.com/150",
                  }}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <View className="absolute -bottom-1 left-3 bg-rose-600 rounded-full w-6 h-6 justify-center items-center">
                  <Ionicons name="add" size={16} color="white" />
                </View>
              </View>
            </TouchableOpacity>

            {/* Like Button */}
            <TouchableOpacity className="items-center" onPress={onLikePressed}>
              <AntDesign
                name={isLiked ? "heart" : "hearto"}
                size={36}
                color={isLiked ? "#ff0050" : "white"}
              />
              <Text className="text-white text-sm font-semibold mt-1">
                {formatCount(currentPost.likes)}
              </Text>
            </TouchableOpacity>

            {/* Comment Button */}
            <TouchableOpacity className="items-center">
              <FontAwesome name="comment" size={34} color="white" />
              <Text className="text-white text-sm font-semibold mt-1">
                {formatCount(currentPost.comments)}
              </Text>
            </TouchableOpacity>

            {/* Share Button */}
            <TouchableOpacity className="items-center">
              <FontAwesome name="share" size={34} color="white" />
              <Text className="text-white text-sm font-semibold mt-1">
                {formatCount(currentPost.shares)}
              </Text>
            </TouchableOpacity>

            {/* Music Button */}
            <TouchableOpacity className="items-center">
              <Ionicons name="musical-notes" size={32} color="white" />
            </TouchableOpacity>
          </View>

          {/* Bottom Info */}
          <View className="absolute bottom-10 left-0 right-0 p-4 pb-6">
            <Text className="text-white text-base font-bold mb-1">
              @{currentPost.username}
            </Text>
            <Text className="text-white text-sm mb-2 pr-16">
              {currentPost.description}
            </Text>
            <View className="flex-row items-center">
              <Entypo name="beamed-note" size={16} color="white" />
              <Text className="text-white text-sm ml-2 font-medium">
                {currentPost.song?.name || "Original Sound"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default TikTokPost;