import React from "react";
import { View, Text, Image } from "react-native";
//@ts-ignore
import logo from "@/assets/logo.png";

const Logo = () => {
  return (
    <View className="items-center">
      <Image
        source={logo}
        className="w-20 h-20"
        style={{ width: 80, height: 80, }}
        resizeMode="contain"
        accessibilityLabel="App logo"
      />

      {/* App Name Text */}
      <Text className="text-4xl font-bold text-primary">SocialApp</Text>

      {/* Optional Tagline */}
      <Text className="text-sm">Connect with friends</Text>
    </View>
  );
};

export default Logo;
