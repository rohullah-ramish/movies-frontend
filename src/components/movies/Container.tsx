import { useGetMoviesByNameQuery } from "@/services/movies";

import LoadingView from "@/components/elements/LoadingView";
import ErrorView from "@/components/elements/ErrorView";
import NoDataView from "@/components/elements/NoDataView";

import DataView from "./DataView";
import { useEffect, useState } from "react";

function MoviesContainer() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetMoviesByNameQuery(page);

  useEffect(() => console.log(page), [page]);

  return (
    <div>
      <h1>Movies!</h1>

      {isLoading ? (
        <LoadingView />
      ) : error ? (
        <ErrorView error={error} />
      ) : data ? (
        <DataView
          data={data.Search}
          total={data.totalResults}
          page={page}
          prev={() => setPage((p) => p-1)}
          next={() => setPage((p) => p+1)}
        />
      ) : (
        <NoDataView />
      )}
    </div>
  );
}

export default MoviesContainer;
