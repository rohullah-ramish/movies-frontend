import { useGetMoviesByNameQuery } from "@/services/movies";

import LoadingView from "@/components/elements/LoadingView";
import ErrorView from "@/components/elements/ErrorView";
import NoDataView from "@/components/elements/NoDataView";

import DataView from "./DataView";

function MoviesContainer() {
  const { data, error, isLoading } = useGetMoviesByNameQuery();

  return (
    <div>
      <h1>Movies!</h1>

      {isLoading ? (
        <LoadingView />
      ) : error ? (
        <ErrorView error={error} />
      ) : data ? (
        <DataView data={data.Search} />
      ) : (
        <NoDataView />
      )}
    </div>
  );
}

export default MoviesContainer;
