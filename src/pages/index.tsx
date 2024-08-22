import DataView from "@/components/pokemon/DataView";
import ErrorView from "@/components/pokemon/ErrorView";
import LoadingView from "@/components/pokemon/LoadingView";
import NoDataView from "@/components/pokemon/NoDataView";

import { useGetPokemonByNameQuery } from "@/store/pokemon";

function Home() {
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

export default Home;
