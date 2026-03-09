import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { tmdb } from "@/lib/tmdb";
import HeroSection from "@/components/HeroSection";
import MovieRow from "@/components/MovieRow";
import MovieCard from "@/components/MovieCard";
import { MovieCardSkeletonGrid } from "@/components/MovieCardSkeleton";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import TrailerModal from "@/components/TrailerModal";

const Index = () => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [heroMovie, setHeroMovie] = useState(null);

  const { data: trending, isLoading: trendingLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: () => tmdb.trending(),
  });

  const { data: popular, isLoading: popularLoading } = useQuery({
    queryKey: ["popular"],
    queryFn: () => tmdb.popular(),
  });

  const { data: topRated, isLoading: topRatedLoading } = useQuery({
    queryKey: ["topRated"],
    queryFn: () => tmdb.topRated(),
  });

  const { data: upcoming, isLoading: upcomingLoading } = useQuery({
    queryKey: ["upcoming"],
    queryFn: () => tmdb.upcoming(),
  });

  const { data: tvPopular, isLoading: tvLoading } = useQuery({
    queryKey: ["tvPopular"],
    queryFn: () => tmdb.tvPopular(),
  });

  const {
    data: discoverData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["discover-infinite"],
    queryFn: ({ pageParam = 1 }) => tmdb.discover(pageParam),
    getNextPageParam: (last) =>
      last.page < Math.min(last.total_pages, 20) ? last.page + 1 : undefined,
    initialPageParam: 1,
  });

  const discoverMovies = useMemo(
    () => discoverData?.pages.flatMap((p) => p.results) || [],
    [discoverData]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const lastRef = useInfiniteScroll(loadMore, !!hasNextPage, isFetchingNextPage);

  useEffect(() => {
    if (trending?.results?.length) {
      const withBackdrop = trending.results.filter((m) => m.backdrop_path);
      if (withBackdrop.length) {
        setHeroMovie(withBackdrop[Math.floor(Math.random() * Math.min(5, withBackdrop.length))]);
      }
    }
  }, [trending]);

  const handlePlayTrailer = async () => {
    if (!heroMovie) return;
    try {
      const type = heroMovie.media_type === "tv" ? "tv" : "movie";
      const data = await tmdb.videos(heroMovie.id, type);
      const trailer = data.results.find(
        (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("Trailer for this movie is currently unavailable.");
      }
    } catch {
      alert("Trailer for this movie is currently unavailable.");
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection movie={heroMovie} onPlayTrailer={handlePlayTrailer} />

      <div className="-mt-20 relative z-10 space-y-2">
        <MovieRow title="Trending This Week" movies={trending?.results || []} isLoading={trendingLoading} />
        <MovieRow title="Popular Movies" movies={popular?.results || []} isLoading={popularLoading} />
        <MovieRow title="Top Rated" movies={topRated?.results || []} isLoading={topRatedLoading} />
        <MovieRow title="Coming Soon" movies={upcoming?.results || []} isLoading={upcomingLoading} />
        <MovieRow title="Popular TV Shows" movies={tvPopular?.results || []} isLoading={tvLoading} />

        {discoverMovies.length > 0 && (
          <section className="py-6">
            <div className="container">
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                Discover More
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {discoverMovies.map((movie, i) => (
                  <div key={`${movie.id}-${i}`} ref={i === discoverMovies.length - 1 ? lastRef : undefined}>
                    <MovieCard movie={movie} index={i % 20} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {isFetchingNextPage && (
          <div className="container py-8">
            <MovieCardSkeletonGrid count={6} />
          </div>
        )}
      </div>

      <TrailerModal videoKey={trailerKey} onClose={() => setTrailerKey(null)} />
    </div>
  );
};

export default Index;
