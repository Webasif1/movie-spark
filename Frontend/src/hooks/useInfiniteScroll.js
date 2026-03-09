import { useEffect, useRef, useCallback } from "react";

export function useInfiniteScroll(callback, hasMore, isLoading) {
  const observer = useRef(null);

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      });
      if (node) observer.current.observe(node);
    },
    [callback, hasMore, isLoading]
  );

  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  return lastElementRef;
}
