import PokemonContainer from "@/components/pokemon/Container";
import MainLayout from "@/layouts/MainLayout";
import { wrapper } from "@/store";

import { getPokemonByName, getRunningQueriesThunk } from "@/store/pokemon";

function SSRHome() {
  return (
    <MainLayout>
      <PokemonContainer />
    </MainLayout>
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
