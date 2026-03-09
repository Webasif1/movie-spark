import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search as SearchIcon } from "lucide-react";
import { tmdb } from "@/lib/tmdb";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import MovieCard from "@/components/MovieCard";
import { MovieCardSkeletonGrid } from "@/components/MovieCardSkeleton";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 400);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: ({ pageParam = 1 }) => tmdb.search(debouncedQuery, pageParam),
    getNextPageParam: (last) => (last.page < last.total_pages ? last.page + 1 : undefined),
    enabled: debouncedQuery.length > 1,
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
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchParams(e.target.value ? { q: e.target.value } : {});
              }}
              placeholder="Search movies, TV shows, people..."
              className="w-full bg-secondary text-foreground pl-12 pr-4 py-4 rounded-xl text-lg outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground transition-all"
            />
          </div>
        </div>

        {debouncedQuery.length <= 1 && (
          <div className="text-center text-muted-foreground py-20">
            <SearchIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">Start typing to search</p>
          </div>
        )}

        {isLoading && <MovieCardSkeletonGrid />}

        {!isLoading && debouncedQuery.length > 1 && allResults.length === 0 && (
          <div className="text-center text-muted-foreground py-20">
            <p className="text-lg">No results found for "{debouncedQuery}"</p>
          </div>
        )}

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

export default SearchPage;
