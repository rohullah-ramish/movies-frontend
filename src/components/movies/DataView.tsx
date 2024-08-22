import { Movie } from "@/services/movies";

type DataViewProps = { data: Movie[] };
function DataView(props: DataViewProps) {
  return (
    <div className="">
      {props.data.map((movie, key) => (
        <div key={key}>
          <div className="">{movie.Title}</div>
          <div className="">{movie.Year}</div>
        </div>
      ))}
    </div>
  );
}

export default DataView;
