// components/ui/input.tsx
import React, { useState } from "react";
import { TextInput, TextInputProps, Text, View } from "react-native";
import { cn } from "@/lib/utils";

interface InputProps extends TextInputProps {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  isDark?: boolean;
  focusRingColor?: string; // Optional custom focus ring color
}

export function Input({
  label,
  labelClassName = "",
  containerClassName = "",
  isDark = false,
  className = "",
  placeholderTextColor,
  focusRingColor = "#f59e0b", // Default amber-400 color
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const defaultPlaceholderColor = isDark ? "#9ca3af" : "#6b7280";
  const textColor = isDark ? "text-gray-50" : "text-stone-950";

  return (
    <View className={cn("w-full mb-4", containerClassName)}>
      {label && (
        <Text
          className={cn(
            "text-sm font-medium mb-1",
            isDark ? "text-gray-300" : "text-stone-700",
            labelClassName
          )}
        >
          {label}
        </Text>
      )}
      <View
        className={cn(
          "flex-row items-center border rounded-lg",
          isDark ? "bg-background border-zinc-200" : "bg- border-zinc-200",
          props.multiline ? "min-h-[100px]" : "h-14",
          isFocused && "border-2" // Thicker border when focused
        )}
        style={
          isFocused
            ? {
                borderColor: focusRingColor,
                shadowColor: focusRingColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 2,
              }
            : {}
        }
      >
        <TextInput
          className={cn("flex-1 px-4 py-2", textColor, className)}
          placeholderTextColor={placeholderTextColor || defaultPlaceholderColor}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
    </View>
  );
}
