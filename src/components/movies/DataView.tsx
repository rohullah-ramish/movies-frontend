import { Movie } from "@/services/movies";

type DataViewProps = {
  data: Movie[];
  total: number;
  page: number;
  limit: number;
  currentPage: string;
  prev: () => void;
  next: () => void;
};

function DataView(props: DataViewProps) {
  const { data, total, limit, page, currentPage, prev, next } = props;

  return (
    <div className="">
      {data.map((movie, key) => (
        <div key={key} className="rounded-md bg-accent">
          <div className="aspect-h-1 aspect-w-1  w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              alt={movie.title}
              src={movie.poster}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="flex flex-col justify-between mt-4">
            <div>
              <p className="mt-1 text-sm">{movie.title}</p>
            </div>
            <p className="text-sm font-medium">{movie.publish_year}</p>
          </div>
        </div>
      ))}

      {/* <div>Total: {total}</div>
      <div className="">
        <button onClick={prev} disabled={page === 1}>
          Prev
        </button>
        <button onClick={next} disabled={page * 10 >= total}>
          Next
        </button> */}
      {/* </div> */}
    </div>
  );
}

export default DataView;
