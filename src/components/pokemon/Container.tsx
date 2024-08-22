import { useGetPokemonByNameQuery } from "@/store/pokemon";

import LoadingView from "./LoadingView";
import ErrorView from "./ErrorView";
import NoDataView from "./NoDataView";
import DataView from "./DataView";

function PokemonContainer() {
  const { data, error, isLoading } = useGetPokemonByNameQuery("pikachu");

  return (
    <div>
      <h1>Hello, World!</h1>

      {isLoading ? (
        <LoadingView />
      ) : error ? (
        <ErrorView error={error} />
      ) : data ? (
        <DataView data={data} />
      ) : (
        <NoDataView />
      )}
    </div>
  );
}

export default PokemonContainer;
