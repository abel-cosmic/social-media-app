import React from "react";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className={`flex-1 items-center justify-center bg-background`}>
      <Text className={`text-xl text-foreground`}>Welcome to Screen</Text>
      <Text className={`mt-2 text-foreground`}>Coming soon...</Text>
    </View>
  );
}
