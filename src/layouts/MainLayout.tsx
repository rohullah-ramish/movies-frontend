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
    <main className={`${montserrat.variable} ${poppins.variable}`}>
      <div className="w-full h-full z-[2]">{props.children}</div>

      <img
        src="/assets/illustration.png"
        className="absolute bottom-0 w-full h-[111px] z-0"
        alt="Illustration"
      />
    </main>
  );
}

export default MainLayout;
