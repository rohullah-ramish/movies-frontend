import { Movie } from "@/services/movies";

type MovieViewProps = {
  movie: Movie;
};

function MovieView(props: MovieViewProps) {
  const { movie } = props;

  return (
    <div className="w-full bg-accent rounded-xl">
      <div className="px-3 pt-3 aspect-[266/400] w-full overflow-hidden">
        <img
          alt={movie.title}
          src={movie.poster}
          className="h-full w-full object-cover object-center rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-between mt-4 p-5">
        <div>
          <p className="text-lg font-medium">{movie.title}</p>
        </div>
        <p className="text-sm font-normal">{movie.publish_year}</p>
      </div>
    </div>
  );
}

export default MovieView;
