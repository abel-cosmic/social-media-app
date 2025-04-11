// 4. Image Viewer Component
import React from "react";
import { Image, Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ImageViewerProps {
  uri: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ uri }) => {
  return (
    <Image
      source={{ uri }}
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: "absolute",
        opacity: 0.7,
      }}
      resizeMode="cover"
    />
  );
};