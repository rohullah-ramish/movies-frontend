import { PropsWithChildren } from "react";

function MovieWrapper(props: PropsWithChildren) {
  return (
    <div className="flex flex-1 justify-center w-full">
      <div className="w-full px-6 lg:px-12 py-12 flex flex-col items-start justify-start gap-12">
        {props.children}
      </div>
    </div>
  );
}

export default MovieWrapper;
