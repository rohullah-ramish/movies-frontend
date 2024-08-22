import DataView from "@/components/pokemon/DataView";
import ErrorView from "@/components/pokemon/ErrorView";
import LoadingView from "@/components/pokemon/LoadingView";
import NoDataView from "@/components/pokemon/NoDataView";
import { wrapper } from "@/store";

import {
  getPokemonByName,
  getRunningQueriesThunk,
  useGetPokemonByNameQuery,
} from "@/store/pokemon";

function SSRHome() {
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.name;

    if (typeof name === "string") {
      store.dispatch(getPokemonByName.initiate(name));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return { props: {} };
  }
);

export default SSRHome;
