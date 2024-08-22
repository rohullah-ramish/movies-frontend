import { Pokemon, useGetPokemonByNameQuery } from "@/store/pokemon";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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

function LoadingView() {
  return <div>Loading...</div>;
}

type ErrorViewProps = { error: FetchBaseQueryError | SerializedError };
function ErrorView(props: ErrorViewProps) {
  return <div>Error: {props.error.toString()}</div>;
}

type DataViewProps = { data: Pokemon };
function DataView(props: DataViewProps) {
  return (
    <div>
      <div className="">{props.data.id}</div>
      <div className="">{props.data.name}</div>
    </div>
  );
}

function NoDataView() {
  return <div>No Data</div>;
}

export default Home;
