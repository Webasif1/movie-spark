import { useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { tmdb } from "@/lib/tmdb";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import MovieCard from "@/components/MovieCard";
import { MovieCardSkeletonGrid } from "@/components/MovieCardSkeleton";

const Browse = () => {
  const { type = "movie" } = useParams();

  const fetchFn = type === "tv" ? tmdb.tvPopular : tmdb.popular;
  const title = type === "tv" ? "TV Shows" : "Movies";

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["browse", type],
    queryFn: ({ pageParam = 1 }) => fetchFn(pageParam),
    getNextPageParam: (last) => (last.page < last.total_pages ? last.page + 1 : undefined),
    initialPageParam: 1,
  });

  const allResults = useMemo(
    () => data?.pages.flatMap((p) => p.results) || [],
    [data]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const lastRef = useInfiniteScroll(loadMore, !!hasNextPage, isFetchingNextPage);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8">{title}</h1>

        {isLoading && <MovieCardSkeletonGrid count={18} />}

        {allResults.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {allResults.map((movie, i) => (
              <div key={`${movie.id}-${i}`} ref={i === allResults.length - 1 ? lastRef : undefined}>
                <MovieCard movie={movie} index={i % 20} />
              </div>
            ))}
          </div>
        )}

        {isFetchingNextPage && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
