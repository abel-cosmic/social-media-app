// app/(tabs)/home.tsx
import React, { useState, useRef, useCallback } from "react";
import { View, FlatList, Dimensions, ViewToken } from "react-native";
import TikTokPost from "@/components/custom/post";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const sampleComments = [
  {
    id: "1",
    username: "user1",
    profilePic: "https://randomuser.me/api/portraits/women/43.jpg",
    text: "This is amazing! 🔥",
    timestamp: "2h ago",
    likes: 24,
    replies: [
      {
        id: "1-1",
        username: "user2",
        profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "I totally agree!",
        timestamp: "1h ago",
        likes: 5,
      },
    ],
  },
  {
    id: "2",
    username: "user3",
    profilePic: "https://randomuser.me/api/portraits/women/63.jpg",
    text: "How did you create this effect?",
    timestamp: "1h ago",
    likes: 12,
  },
];

export default function HomeScreen() {
  // Sample feed data with guaranteed working URLs
  const originalFeed = [
    // Video Post 1
    {
      id: "1",
      mediaUri:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      mediaType: "video",
      username: "adventure_lover",
      profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
      caption: "Best joyrides of my life! 🚗💨 #adventure #travel",
      songName: "The Weeknd - Blinding Lights",
      likes: 1,
      comments: sampleComments,
      bookmarks: 320,
    },

    // Image Post 1
    {
      id: "2",
      mediaUri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      mediaType: "image",
      username: "nature_photographer",
      profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
      caption:
        "Beautiful landscape from my recent trip 🌄 #nature #photography",
      likes: 8754,
      comments: sampleComments.slice(0, 1),
      bookmarks: 211,
    },

    // Video Post 2
    {
      id: "3",
      mediaUri:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      mediaType: "video",
      username: "fire_dancer",
      profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
      caption: "Fire performance practice session 🔥 #performance #fire",
      songName: "Billie Eilish - bad guy",
      likes: 15789,
      comments: sampleComments,
      bookmarks: 543,
    },

    // Image Post 2
    {
      id: "4",
      mediaUri: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      mediaType: "image",
      username: "urban_explorer",
      profilePic: "https://randomuser.me/api/portraits/men/75.jpg",
      caption: "City lights at night 🌃 #urban #nightphotography",
      likes: 5621,
      comments: [],
      bookmarks: 421,
    },

    // Video Post 3
    {
      id: "5",
      mediaUri:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      mediaType: "video",
      username: "travel_guru",
      profilePic: "https://randomuser.me/api/portraits/women/25.jpg",
      caption: "Escape to these beautiful locations ✈️ #travel #wanderlust",
      songName: "Surfaces - Sunday Best",
      likes: 4598,
      comments: sampleComments.slice(1, 2),
      bookmarks: 185,
    },
  ];
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [feedData, setFeedData] = useState(originalFeed);
  const flatListRef = useRef<FlatList>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Handle viewable items change
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setVisibleIndex(viewableItems[0].index || 0);
      }
    }
  ).current;

  // Infinite scroll handler
  const onEndReached = useCallback(() => {
    if (isScrolling) return;

    setIsScrolling(true);
    // Duplicate the feed data to create infinite scroll illusion
    setFeedData([...feedData, ...originalFeed]);
    setIsScrolling(false);
  }, [feedData, isScrolling]);

  // Snap to one item at a time
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 90, // Higher threshold for more precise snapping
    minimumViewTime: 300,
  }).current;

  // Render each post
  const renderPost = useCallback(
    ({ item, index }) => (
      <TikTokPost {...item} isActive={index === visibleIndex} />
    ),
    [visibleIndex]
  );

  // Get item layout for optimization
  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: SCREEN_HEIGHT,
      offset: SCREEN_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <View className="flex-1 bg-black">
      <FlatList
        ref={flatListRef}
        data={feedData}
        renderItem={renderPost}
        keyExtractor={(item: { id: any }, index: any) => `${item.id}-${index}`}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        getItemLayout={getItemLayout}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
}
