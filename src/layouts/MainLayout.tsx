import { PropsWithChildren } from "react";

function MainLayout(props: PropsWithChildren) {
  return <div>{props.children}</div>;
}

export default MainLayout;
