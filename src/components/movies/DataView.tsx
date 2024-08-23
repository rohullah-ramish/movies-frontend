import { Movie } from "@/services/movies";
import { useRouter } from "next/router";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";

type DataViewProps = {
  data: Movie[];
  total: number;
  page: number;
  limit: number;
  currentPage: string;
  prev: () => void;
  next: () => void;
  jumpToPage: (nextPage: number) => void;
};

function DataView(props: DataViewProps) {
  const { data, total, page, prev, next, jumpToPage } = props;
  const router = useRouter()
  const logout = () => {
    localStorage.clear();
    router.push('/')
  };
  return (
    <div className="w-full px-6 lg:px-12">
      <div className="py-6 lg:py-12 flex items-center justify-between w-full">
        <h2 className="font-montserrat items-center justify-start gap-4 inline-flex">
          My movies
          <IoIosAddCircleOutline className="text-4xl" />
        </h2>

        <button
          className="w-[104px] flex items-center justify-center gap-3 text-sm"
          onClick={logout}
        >
          Logout <LuLogOut className="text-lg" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((movie, key) => (
          <MovieView key={key} movie={movie} />
        ))}
      </div>

      <div className="mx-auto w-min flex items-center justify-center gap-4 py-12 font-montserrat">
        <button onClick={prev} disabled={page === 1}>
          Prev
        </button>
        <div className="flex items-center justify-center gap-3">
          {Array.from(new Array(total)).map((_, index) => (
            <button
              key={index}
              className={`w-[32px] h-[32px] text-white rounded-[4px] ${
                page === index + 1 ? "bg-primary" : "bg-accent"
              }`}
              onClick={() => jumpToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button onClick={next} disabled={page >= total}>
          Next
        </button>
      </div>
    </div>
  );
}

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

export default DataView;
