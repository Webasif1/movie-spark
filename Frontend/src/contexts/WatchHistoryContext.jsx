import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { watchHistoryApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const WatchHistoryContext = createContext(null);

export const useWatchHistory = () => {
  const ctx = useContext(WatchHistoryContext);
  if (!ctx) throw new Error("useWatchHistory must be used within WatchHistoryProvider");
  return ctx;
};

export const WatchHistoryProvider = ({ children }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["watch-history"],
    queryFn: watchHistoryApi.getAll,
    enabled: !!user,
  });

  const addMutation = useMutation({
    mutationFn: watchHistoryApi.add,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["watch-history"] }),
  });

  const clearMutation = useMutation({
    mutationFn: watchHistoryApi.clear,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["watch-history"] }),
  });

  const addToHistory = (movie) => {
    if (!user) return;
    addMutation.mutate(movie);
  };

  return (
    <WatchHistoryContext.Provider
      value={{
        history: data || [],
        isLoading,
        addToHistory,
        clearHistory: clearMutation.mutate,
      }}
    >
      {children}
    </WatchHistoryContext.Provider>
  );
};
