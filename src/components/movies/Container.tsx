import { useState } from "react";

import { useGetMoviesListQuery } from "@/services/movies";

import LoadingView from "@/components/elements/LoadingView";
import ErrorView from "@/components/elements/ErrorView";
import NoDataView from "@/components/elements/NoDataView";

import DataView from "./DataView";

function MoviesContainer() {
  const [page, setPage] = useState(1);

  const { data: moviesData, error, isLoading } = useGetMoviesListQuery(page);

  return (
    <>
      {isLoading ? (
        <LoadingView />
      ) : error ? (
        <ErrorView error={error} />
      ) : moviesData?.data?.length ? (
        <DataView
          data={moviesData.data}
          total={moviesData.total}
          page={page}
          prev={() => setPage((p) => p - 1)}
          next={() => setPage((p) => p + 1)}
          jumpToPage={(p) => setPage(p)}
        />
      ) : (
        <NoDataView />
      )}
    </>
  );
}

export default MoviesContainer;
