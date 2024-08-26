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
import { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Overlay from "./OverLay";

type DataViewProps = PaginationProps & {
  data: Movie[];
  searchQuery: (query: string) => void;
};

function DataView(props: DataViewProps) {
  const { data, searchQuery, ...rest } = props;

  const [search, setSearch] = useState("");
  const [isLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  const overLayHandler = () => {
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    console.log("search", search);
    if (search.length > 0) {
      searchQuery(search);
    }
    setIsOverlayOpen(false);
  };
  const escFunction = useCallback((event: { key: string }) => {
    if (event.key === "Escape") {
      handleCloseOverlay();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return (
    <MovieWrapper>
      <Header>
        <Title>
          My movies
          {isLoggedIn ? (
            <Link className="text-[inherit]" href="/movies/add">
              <IoIosAddCircleOutline className="text-4xl" />
            </Link>
          ) : (
            ""
          )}
          <CiSearch
            className="text-4xl cursor-pointer"
            onClick={overLayHandler}
          />
        </Title>
        {isLoggedIn ? (
          <button
            className="w-[104px] flex items-center justify-center gap-3 text-sm cursor-pointer"
            onClick={logout}
          >
            Logout <LuLogOut className="text-lg" />
          </button>
        ) : (
          ""
        )}
      </Header>

      <div className="flex flex-col items-center justify-center gap-6 lg:gap-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-[20px] lg:gap-6">
          {data.map((movie, key) => (
            <MovieView key={key} movie={movie} />
          ))}
        </div>

        <Pagination {...rest} />
      </div>

      {/* <Overlay isOpen={isOverlayOpen} onClose={handleCloseOverlay}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("search", search);
          }}
        >
          <div className="bg-accent content-center flex items-center px-4 rounded-lg">
            <CiSearch className="text-4xl" />
            <input
              type="text"
              placeholder="search"
              value={search}
              className="!bg-transparent focus-visible:outline-0 "
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" ? handleCloseOverlay() : "";
              }}
            />
            <span className="bg-neutral h-[32px] p-2 rounded-md w-[32px]">
              ecs
            </span>
          </div>
        </form>
      </Overlay> */}
    </MovieWrapper>
  );
}

export default DataView;
