// providers/apollo-provider.tsx
import React from "react";
import { ApolloProvider as ApolloClientProvider } from "@apollo/client";
import { client } from "@/lib/apollo.client";

interface ApolloProviderProps {
  children: React.ReactNode;
}

export function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <ApolloClientProvider client={client}>
      {children}
    </ApolloClientProvider>
  );
}