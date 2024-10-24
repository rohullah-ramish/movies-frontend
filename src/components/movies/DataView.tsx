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
import Cookies from 'js-cookie';
import NoDataFoundView from "../elements/NoDataFoundView";
import NoDataView from "../elements/NoDataView";

type DataViewProps = PaginationProps & {
  data: Movie[];
  searchQuery: (query: string) => void;
};

function DataView(props: DataViewProps) {
  const { data, searchQuery, ...rest } = props;

  const [search, setSearch] = useState("");
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    Cookies.remove('token');
    router.push("/");
  };

  const overLayHandler = () => {
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    if (search.length > 0) {
      searchQuery(search);
    }else{
      searchQuery('');
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
    setIsLoggedIn(localStorage.getItem("token") ? true : false)
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };

    
    }, [escFunction]);

  return (
    <MovieWrapper>
      <Header>
        <Title >
			<h4 className="font-thin text-[48px]">My movies</h4>
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
            className="w-[104px] semibold flex items-center justify-center gap-3 text-sm cursor-pointer "
            onClick={logout}
          >	
            Logout <LuLogOut className="text-lg" />
          </button>
        ) : (
          ""
        )}
      </Header>

      {search.length > 0 ? (
        <span className="text-4xl"> Search results for {search}</span>
      ) : (
        ""
      )}
		{
	data?.length == 0 && search.length > 0 ? (
        <NoDataFoundView resetSearchQuery={(q) => setSearch(q)} />
      ) : data.length  === 0 &&(
        <NoDataView />
      )
		}
		{ data?.length !== 0 && <div className="flex flex-col items-center justify-center gap-6 lg:gap-12">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] lg:gap-6">
				{data.map((movie, key) => (
					<MovieView key={key} movie={movie} />
				))}
			</div>

			<Pagination {...rest} />
		</div>
		}
      <Overlay isOpen={isOverlayOpen} onClose={handleCloseOverlay}>
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
      </Overlay>
    </MovieWrapper>
  );
}

export default DataView;
