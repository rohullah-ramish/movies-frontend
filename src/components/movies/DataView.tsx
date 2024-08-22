import { Movie } from "@/services/movies";

type DataViewProps = {
  data: Movie[];
  total: number;
  page: number;
  prev: () => void;
  next: () => void;
};

function DataView(props: DataViewProps) {
  const { data, total, page, prev, next } = props;

  return (
    <div className="">
      {data.map((movie, key) => (
        <div key={key}>
          <div className="">{movie.Title}</div>
          <div className="">{movie.Year}</div>
        </div>
      ))}

      <div>Total: {total}</div>
      <div className="">
        <button onClick={prev} disabled={page === 1}>
          Prev
        </button>
        <button onClick={next} disabled={page * 10 >= total}>
          Next
        </button>
      </div>
    </div>
  );
}

export default DataView;
