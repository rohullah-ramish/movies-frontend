import { PropsWithChildren } from "react";

function Header(props: PropsWithChildren) {
  return (
    <div className="py-6 lg:py-12 flex items-center justify-between w-full">
      {props.children}
    </div>
  );
}

export default Header;
