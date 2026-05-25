
"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

type LoadingContextType = {
  loading: boolean;

  startLoading:
    () => void;

  stopLoading:
    () => void;
};

const LoadingContext =
  createContext<
    LoadingContextType
      | undefined
  >(undefined);

export function
LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [loading, setLoading] =
    useState(false);

  function startLoading() {
    setLoading(true);
  }

  function stopLoading() {
    setLoading(false);
  }

  return (
    <LoadingContext.Provider
      value={{
        loading,
        startLoading,
        stopLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function
useLoadingContext() {

  const context =
    useContext(
      LoadingContext
    );

  if (!context) {
    throw new Error(
      "LoadingProvider manquant"
    );
  }

  return context;
}
