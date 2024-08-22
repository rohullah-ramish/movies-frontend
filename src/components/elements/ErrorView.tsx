import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ErrorViewProps = { error: FetchBaseQueryError | SerializedError };
function ErrorView(props: ErrorViewProps) {
  return <div>Error: {props.error.toString()}</div>;
}

export default ErrorView;
