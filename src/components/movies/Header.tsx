import { PropsWithChildren } from "react";

function Header(props: PropsWithChildren) {
  return (
    <div className="flex items-center justify-between w-full">
      {props.children}
    </div>
  );
}

export default Header;
