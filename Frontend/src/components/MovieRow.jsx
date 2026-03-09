import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

const MovieRow = ({ title, movies, isLoading }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <section className="py-6">
        <div className="container">
          <div className="h-8 w-48 bg-secondary rounded mb-4 animate-pulse" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[160px] md:w-[200px]">
                <div className="aspect-[2/3] rounded-lg bg-secondary animate-pulse" />
                <div className="mt-2 h-4 bg-secondary rounded w-3/4 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!movies.length) return null;

  return (
    <section className="py-6">
      <div className="container">
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
          {title}
        </h2>

        <div className="relative group">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-8 z-10 w-10 flex items-center justify-center bg-gradient-to-r from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-8 z-10 w-10 flex items-center justify-center bg-gradient-to-l from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {movies.map((movie, i) => (
              <div key={movie.id} className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[200px]">
                <MovieCard movie={movie} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieRow;
