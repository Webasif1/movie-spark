import { Link } from "react-router-dom";
import { Play, Star, Info } from "lucide-react";
import { motion } from "framer-motion";
import { backdrop } from "@/lib/tmdb";

const HeroSection = ({ movie, onPlayTrailer }) => {
  if (!movie) {
    return (
      <div className="relative h-[70vh] md:h-[85vh] bg-secondary animate-pulse" />
    );
  }

  const title = movie.title || movie.name || "Untitled";
  const mediaType = movie.media_type || (movie.title ? "movie" : "tv");

  return (
    <div className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdrop(movie.backdrop_path)})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      <div className="relative h-full container flex items-end pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-none mb-4">
            {title}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            {movie.vote_average > 0 && (
              <span className="flex items-center gap-1.5 text-primary font-semibold">
                <Star className="w-5 h-5 fill-primary" />
                {movie.vote_average.toFixed(1)}
              </span>
            )}
            {(movie.release_date || movie.first_air_date) && (
              <span className="text-muted-foreground text-sm">
                {(movie.release_date || movie.first_air_date || "").slice(0, 4)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3 mb-6">
            {movie.overview || "Description not available"}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onPlayTrailer}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:brightness-110 transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              Watch Trailer
            </button>
            <Link
              to={`/${mediaType}/${movie.id}`}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-muted transition-all"
            >
              <Info className="w-5 h-5" />
              More Info
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
