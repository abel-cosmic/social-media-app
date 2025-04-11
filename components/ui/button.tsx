// components/ui/button.tsx
import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import { cn } from "@/lib/utils";

type ButtonProps = TouchableOpacityProps & {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg";
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
  textClassName?: string;
};

export function Button({
  variant = "default",
  size = "default",
  isLoading = false,
  className = "",
  textClassName = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = "flex flex-row items-center justify-center rounded-md";
  const sizeClasses = {
    default: "h-12 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
  };
  const variantClasses = {
    default: "bg-primary",
    destructive: "bg-destructive",
    outline: "border border-input bg-background",
    secondary: "bg-secondary",
    ghost: "",
    link: "",
  };
  const textClasses = {
    default: "text-primary-foreground",
    destructive: "text-destructive-foreground",
    outline: "text-foreground",
    secondary: "text-secondary-foreground",
    ghost: "text-foreground",
    link: "text-primary underline",
  };

  return (
    <TouchableOpacity
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50",
        className
      )}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <View className="flex-row items-center gap-2">
          <ActivityIndicator
            size="small"
            color={
              variant === "default" || variant === "destructive"
                ? "#ffffff"
                : "#000000"
            }
          />
          <Text
            className={cn(
              "font-medium text-center",
              textClasses[variant],
              textClassName
            )}
          >
            Loading...
          </Text>
        </View>
      ) : (
        <Text
          className={cn(
            "font-medium text-center",
            textClasses[variant],
            textClassName
          )}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}
