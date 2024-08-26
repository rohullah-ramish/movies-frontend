import MovieWrapper from "../MovieWrapper";
import Header from "../Header";
import Title from "../Title";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetMoviesDetailsQuery } from "@/services/movies";
import LoadingView from "@/components/elements/LoadingView";

function DetailMovieContainer() {
  const router = useRouter();

  const { id } = router.query;

  const {
    data: moviesData,
    error,
    isLoading,
  } = useGetMoviesDetailsQuery(id?.toString() || "", {
    skip: id?.length == 0,
  });

  const [title, setTitle] = useState("");
  const [publishYear, setPublishYear] = useState(0);

  const [poster, setPoster] = useState<string | undefined>();
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(() => {
    const id = router.query.id;

    console.log(moviesData);
    if (id) {
      const data = moviesData?.data[0];
      setTitle(data?.title || "");
      setPublishYear(Number(data?.publish_year) || 0);
      setPoster(data?.poster || "");
    }

    setIsLoggedIn(localStorage.getItem("token") ? true : false)
  }, [moviesData]);

  return (
    <MovieWrapper>
      <Header>
        <Title>Movie Details</Title>
      </Header>

      {isLoading ? (
        <LoadingView />
      ) : (
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col-reverse md:flex-row w-full gap-6 lg:gap-12">
            <div className="aspect-[1/1] max-w-[420px] w-full rounded-[10px]">
              <div className="h-full flex-col flex flex-1">
                <img src={poster} className="object-contain w-full h-80" />
              </div>
            </div>

            <div className="flex flex-col items-start justify-start w-full gap-10">
              <div className="flex flex-col items-start justify-start w-full gap-6">
                <h4 className="">{title}</h4>
                <h5>{publishYear}</h5>
              </div>
              <div className="hidden md:flex items-start justify-start w-full gap-5">
                <button
                  className="border border-white max-w-[167px] hover:bg-accent"
                  onClick={() => router.push("/movies")}
                >
                  Back
                </button>
                {isLoggedIn ? (
                  <button
                    className="bg-primary max-w-[167px] cursor-pointer"
                    onClick={() => router.push(`/movies/${id}`)}
                  >
                    Edit
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="flex md:hidden items-start justify-start w-full gap-5">
            <button
              className="border border-white hover:bg-accent"
              onClick={() => router.push("/movies")}
            >
              Cancel
            </button>
            {isLoggedIn ? (
              <button
                className="bg-primary"
                onClick={() => router.push(`/movies/${id}`)}
              >
                Edit
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </MovieWrapper>
  );
}

export default DetailMovieContainer;
