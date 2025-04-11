// components/custom/video-player.tsx
import React, { useRef, useEffect } from "react";
import { Dimensions,View } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface VideoPlayerProps {
  uri: string;
  isActive: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ uri, isActive }) => {
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    const handlePlayback = async () => {
      if (!videoRef.current) return;

      if (isActive) {
        try {
          await videoRef.current.playAsync();
        } catch (error) {
          console.warn("Error playing video:", error);
        }
      } else {
        await videoRef.current.pauseAsync();
        await videoRef.current.setPositionAsync(0); // Reset to start when inactive
      }
    };

    handlePlayback();

    return () => {
      if (videoRef.current) {
        videoRef.current.pauseAsync();
      }
    };
  }, [isActive]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        resizeMode={ResizeMode.COVER}
        shouldPlay={false} // We'll control playback manually
        isLooping
        isMuted={false}
        volume={1.0}
        rate={1.0}
        useNativeControls={false}
      />
    </View>
  );
};