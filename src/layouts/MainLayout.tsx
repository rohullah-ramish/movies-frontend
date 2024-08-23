import { PropsWithChildren } from "react";

import { Montserrat, Poppins } from "next/font/google";

const montserrat = Montserrat({ variable: "--montserrat", subsets: ["latin"] });
const poppins = Poppins({
  variable: "--poppins",
  weight: ["600", "700"],
  subsets: ["latin"],
});

function MainLayout(props: PropsWithChildren) {
  return (
    <div className={`${montserrat.variable} ${poppins.variable}`}>
      {props.children}
    </div>
  );
}

export default MainLayout;
