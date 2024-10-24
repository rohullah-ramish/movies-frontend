import { PropsWithChildren } from "react";

function MovieWrapper(props: PropsWithChildren) {
  return (
    <div className="flex flex-1 justify-center w-full">
      <div className="w-full pt-6 gap-6 pb-12 px-6 lg:px-12 md:pt-12 flex flex-col items-start justify-start md:gap-12">
        {props.children}
      </div>
    </div>
  );
}

export default MovieWrapper;
