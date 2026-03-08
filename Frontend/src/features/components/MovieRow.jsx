import MovieCard from "../components/MovieCart";
import Slider from "react-slick";

const MovieRow = ({ title, movies }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,      // adjust for screen size
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-2">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieRow;
