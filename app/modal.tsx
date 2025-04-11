import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, Text, View } from "react-native";

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-xl font-bold text-dark dark:text-white">Modal</Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
