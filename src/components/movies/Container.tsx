import { useGetMoviesByNameQuery } from "@/services/movies";

import LoadingView from "@/components/elements/LoadingView";
import ErrorView from "@/components/elements/ErrorView";
import NoDataView from "@/components/elements/NoDataView";

import DataView from "./DataView";
import { useEffect, useState } from "react";

function MoviesContainer() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetMoviesByNameQuery(page);

  useEffect(() => console.log(data), [data]);

  return (
    <div className="flex flex-1 justify-center w-full">
      {isLoading ? (
        <LoadingView />
      ) : error ? (
        <ErrorView error={error} />
      ) : data?.length ? (
        <DataView
          data={data.data}
          total={data.totalResults}
          page={page}
          prev={() => setPage((p) => p - 1)}
          next={() => setPage((p) => p + 1)}
          limit={0}
          currentPage={""}
        />
      ) : (
        <NoDataView />
      )}
    </div>
  );
}

export default MoviesContainer;
