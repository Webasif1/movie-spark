const TVRow = ({ title, shows }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="flex gap-4 overflow-x-auto">
      {shows.map((show) => (
        <div key={show.id} className="min-w-[150px]">
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            className="rounded-lg"
            alt={show.name}
          />
          <h3 className="mt-2 text-sm">{show.name}</h3>
        </div>
      ))}
    </div>
  </div>
);

export default TVRow;
