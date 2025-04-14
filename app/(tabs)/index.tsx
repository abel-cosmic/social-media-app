// app/(tabs)/index.tsx
import React, { useState, useRef } from "react";
import { View, FlatList, Dimensions, ActivityIndicator, Text } from "react-native";
import TikTokPost from "@/components/custom/post";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "@/apollo/queries/post";

export default function HomeScreen() {
  const [activePostIndex, setActivePostIndex] = useState(0);

  // Screen dimensions
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  // Get posts from API
  const { data, loading, error, refetch } = useQuery(GET_ALL_POSTS);

  // Handle viewability change to detect active post
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActivePostIndex(viewableItems[0].index);
    }
  }).current;

  // Viewability config
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  // Loading state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF3B5C" />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ color: "red", textAlign: "center" }}>
          Error loading posts: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        data={data?.posts || []}
        renderItem={({ item, index }) => (
          <TikTokPost
            id={item.id}
            mediaUri={item.mediaFile}
            mediaType={item.mediaFile.endsWith('.mp4') ? "video" : "image"}
            username={item.user.username}
            profilePic={item.user.profilePicture || "https://via.placeholder.com/150"}
            caption={item.caption || ""}
            songName={item.songName || "Original sound"}
            likes={item.likesCount || 0}
            bookmarks={0} // Backend doesn't seem to have bookmarks
            isActive={index === activePostIndex}
          />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        pagingEnabled
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        snapToInterval={screenHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        onRefresh={refetch}
        refreshing={loading}
      />
    </View>
  );
}