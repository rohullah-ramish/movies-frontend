import { PropsWithChildren } from "react";

function Title(props: PropsWithChildren) {
  return (
    <div className="text-4xl lg:text-5xl font-montserrat items-center justify-start gap-4 inline-flex">
      {props.children}
    </div>
  );
}

export default Title;
