// providers/apollo-provider.tsx
import React from "react";
import { ApolloProvider as ApolloClientProvider } from "@apollo/client";
import { client } from "@/apollo/client";
import { AuthGuard } from "./auth-gurad";

interface ApolloProviderProps {
  children: React.ReactNode;
}

export function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <ApolloClientProvider client={client}>
      <AuthGuard>{children}</AuthGuard>
    </ApolloClientProvider>
  );
}
