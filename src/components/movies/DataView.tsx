import { Movie } from "@/services/movies";
import { useRouter } from "next/router";
import MovieView from "./MovieView";
import Header from "./Header";
import Title from "./Title";
import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import MovieWrapper from "./MovieWrapper";
import Pagination, { PaginationProps } from "./Pagination";

type DataViewProps = PaginationProps & {
  data: Movie[];
};

function DataView(props: DataViewProps) {
  const { data, ...rest } = props;

  const router = useRouter();
  
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <MovieWrapper>
      <Header>
        <Title>
          My movies
          <Link className="text-[inherit]" href="/movies/add">
            <IoIosAddCircleOutline className="text-4xl" />
          </Link>
        </Title>
        <button
          className="w-[104px] flex items-center justify-center gap-3 text-sm"
          onClick={logout}
        >
          Logout <LuLogOut className="text-lg" />
        </button>
      </Header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((movie, key) => (
          <MovieView key={key} movie={movie} />
        ))}
      </div>

      <Pagination {...rest} />
    </MovieWrapper>
  );
}

export default DataView;
