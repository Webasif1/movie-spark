const MovieCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[2/3] rounded-lg bg-secondary" />
    <div className="mt-2 px-1 space-y-1.5">
      <div className="h-4 bg-secondary rounded w-3/4" />
      <div className="h-3 bg-secondary rounded w-1/2" />
    </div>
  </div>
);

export const MovieCardSkeletonGrid = ({ count = 12 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <MovieCardSkeleton key={i} />
    ))}
  </div>
);

export default MovieCardSkeleton;
