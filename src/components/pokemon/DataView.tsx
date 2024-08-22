import { Pokemon } from "@/store/pokemon";

type DataViewProps = { data: Pokemon };
function DataView(props: DataViewProps) {
  return (
    <div>
      <div className="">{props.data.id}</div>
      <div className="">{props.data.name}</div>
    </div>
  );
}

export default DataView;
