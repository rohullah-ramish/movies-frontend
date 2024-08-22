import { useGetPokemonByNameQuery } from "@/services/pokemon";

import LoadingView from "@/components/elements/LoadingView";
import ErrorView from "@/components/elements/ErrorView";
import NoDataView from "@/components/elements/NoDataView";

import DataView from "./DataView";

function PokemonContainer() {
  const { data, error, isLoading } = useGetPokemonByNameQuery("pikachu");

  return (
    <div>
      <h1>Pokemons</h1>

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
