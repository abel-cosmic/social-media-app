import { Button } from "@/components/ui/button";
import { Link, Stack, useRouter } from "expo-router";
import React from "react";

import { Text, View } from "react-native";

export default function NotFoundScreen() {
  const { push } = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-5 bg-background">
        <Text className="text-xl font-bold text-foreground">
          This screen doesn&apos;t exist.
        </Text>
        <Button onPress={() => push("/sign-in")}>Go to Home Screen</Button>
      </View>
    </>
  );
}
