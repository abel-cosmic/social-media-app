// 7. Music Disc Component
import React, { useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import { Disc3 } from "lucide-react-native";

export const MusicDisc: React.FC = () => {
  const musicAnimationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startMusicAnimation();
    return () => {
      musicAnimationValue.stopAnimation();
    };
  }, []);

  const startMusicAnimation = () => {
    Animated.loop(
      Animated.timing(musicAnimationValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  };

  const spinAnimation = musicAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="items-center">
      <Animated.View style={{ transform: [{ rotate: spinAnimation }] }}>
        <View className="bg-background rounded-full p-2">
          <Disc3 size={24} color="white" />
        </View>
      </Animated.View>
    </View>
  );
};
