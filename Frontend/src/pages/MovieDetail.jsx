import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Star, Clock, Calendar, Play, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { tmdb, img, backdrop as backdropUrl } from "@/lib/tmdb";
import TrailerModal from "@/components/TrailerModal";
import MovieRow from "@/components/MovieRow";
import FavoriteButton from "@/components/FavoriteButton";
import { useWatchHistory } from "@/contexts/WatchHistoryContext";
const MovieDetail = () => {
  const { type = "movie", id } = useParams();
  const movieId = Number(id);
  const mediaType = type;

  const [trailerKey, setTrailerKey] = useState(null);

  const { data: detail, isLoading } = useQuery({
    queryKey: ["detail", type, movieId],
    queryFn: () => (mediaType === "tv" ? tmdb.tvDetail(movieId) : tmdb.movieDetail(movieId)),
    enabled: !!movieId,
  });

  const { data: credits } = useQuery({
    queryKey: ["credits", type, movieId],
    queryFn: () => tmdb.credits(movieId, mediaType),
    enabled: !!movieId,
  });

  const { data: similar } = useQuery({
    queryKey: ["similar", type, movieId],
    queryFn: () => tmdb.similar(movieId, mediaType),
    enabled: !!movieId,
  });

  const { data: videos } = useQuery({
    queryKey: ["videos", type, movieId],
    queryFn: () => tmdb.videos(movieId, mediaType),
    enabled: !!movieId,
  });

  const { addToHistory } = useWatchHistory();

  // Track page visit as watch history
  useEffect(() => {
    window.scrollTo(0, 0);
    if (detail) {
      addToHistory({
        tmdbId: movieId,
        title: detail.title || detail.name,
        poster: detail.poster_path,
        mediaType,
      });
    }
  }, [movieId, detail]);

  const handlePlayTrailer = () => {
    const trailer = videos?.results?.find(
      (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
    );
    if (trailer) {
      setTrailerKey(trailer.key);
      // Also track trailer watch
      if (detail) {
        addToHistory({
          tmdbId: movieId,
          title: detail.title || detail.name,
          poster: detail.poster_path,
          mediaType,
        });
      }
    } else {
      alert("Trailer for this movie is currently unavailable.");
    }
  };

  if (isLoading || !detail) {
    return (
      <div className="min-h-screen pt-16">
        <div className="h-[60vh] bg-secondary animate-pulse" />
        <div className="container py-8 space-y-4">
          <div className="h-10 w-64 bg-secondary rounded animate-pulse" />
          <div className="h-4 w-full max-w-xl bg-secondary rounded animate-pulse" />
          <div className="h-4 w-full max-w-md bg-secondary rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const title = detail.title || detail.name || "Untitled";
  const year = (detail.release_date || detail.first_air_date || "").slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="relative h-[50vh] md:h-[65vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl(detail.backdrop_path)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

        <div className="relative container h-full flex items-start pt-20">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>

      <div className="container -mt-40 relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-8"
        >
          <div className="flex-shrink-0 w-48 md:w-64">
            <img
              src={img(detail.poster_path, "w500")}
              alt={title}
              className="w-full rounded-xl shadow-2xl"
              onError={(e) => {
                e.target.src = "/placeholder.svg";
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-none mb-2">
              {title}
            </h1>

            {detail.tagline && (
              <p className="text-primary text-sm italic mb-4">"{detail.tagline}"</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
              {detail.vote_average > 0 && (
                <span className="flex items-center gap-1.5 text-primary font-semibold">
                  <Star className="w-4 h-4 fill-primary" />
                  {detail.vote_average.toFixed(1)}
                </span>
              )}
              {year && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {year}
                </span>
              )}
              {detail.runtime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {detail.runtime} min
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {detail.genres?.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-foreground/80 leading-relaxed mb-6 max-w-2xl">
              {detail.overview || "Description not available"}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayTrailer}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:brightness-110 transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                Watch Trailer
              </button>
              <FavoriteButton movie={detail} size="md" />
            </div>
          </div>
        </motion.div>

        {credits?.cast && credits.cast.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl text-foreground mb-4">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {credits.cast.slice(0, 15).map((person) => (
                <div key={person.id} className="flex-shrink-0 w-24 text-center">
                  <img
                    src={img(person.profile_path, "w185")}
                    alt={person.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto bg-secondary"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                  <p className="text-xs text-foreground mt-2 font-medium line-clamp-2">{person.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similar?.results && similar.results.length > 0 && (
          <div className="mt-8">
            <MovieRow title="Similar" movies={similar.results} />
          </div>
        )}
      </div>

      <TrailerModal videoKey={trailerKey} onClose={() => setTrailerKey(null)} />
    </div>
  );
};

export default MovieDetail;
