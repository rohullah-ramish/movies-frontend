import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useGetMoviesListQuery } from "@/services/movies";

import LoadingView from "@/components/elements/LoadingView";
import ErrorView from "@/components/elements/ErrorView";
import NoDataView from "@/components/elements/NoDataView";

import DataView from "./DataView";
import NoDataFoundView from "../elements/NoDataFoundView";

function MoviesContainer() {
  const [page, setPage] = useState(1);
  const [search, setSearchQuery] = useState("");

  const {
    data: moviesData,
    error,
    isLoading,
  } = useGetMoviesListQuery({ page, search });

  return (
    <>
      {isLoading ? (
        <LoadingView />
      ) : error ? (
        <ErrorView error={error} />
      ) :(
        <DataView
          data={moviesData.data}
          total={moviesData.total}
          page={page}
          prev={() => setPage((p) => p - 1)}
          next={() => setPage((p) => p + 1)}
          jumpToPage={(p) => setPage(p)}
		  searchQuery={(q) => { 
			  setPage(1);		
			  setSearchQuery(q);
		  }
		}
        />
      )}
        <Toaster />
    </>
  );
}

export default MoviesContainer;
