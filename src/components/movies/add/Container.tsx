import MovieWrapper from "../MovieWrapper";
import Header from "../Header";
import Title from "../Title";
import { FiDownload } from "react-icons/fi";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import {
  getMoviesDetails,
  useAddMoviesMutation,
  useGetMoviesDetailsQuery,
  useUpdateMoviesMutation,
} from "@/services/movies";
import { useDispatch } from "react-redux";

function AddMovieContainer() {
  const router = useRouter();

  const { id } = router.query;

  const [addMovies] = useAddMoviesMutation();
  const [updateMovies] = useUpdateMoviesMutation();
  const {
    data: moviesData,
    error,
    isLoading,
  } = useGetMoviesDetailsQuery(id?.toString() || "", {
    skip: id?.length == 0,
  });

  const [title, setTitle] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const [poster, setPoster] = useState<string | undefined>();
  const [file, setFile] = useState<File | undefined>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleForm = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("publish_year", publishYear.toString()); // Convert number to string
    if (poster) {
      formData.append("poster", (file as any) || poster);
    }
    if (!id) {
      const toastId = toast.loading("Movie adding in your list...");
      try {
        const result = await addMovies(formData).unwrap();
        toast.remove(toastId);
        toast.success("Movie Added in Your List !");
        router.push("/movies");
      } catch (err) {
        toast.remove(toastId);
        toast.error("Failed to add movie");
      }
    } else {
      try {
        const result = await updateMovies({
          id: id.toString(),
          body: formData,
        }).unwrap();
        toast.success("Movie Update in Your List !");
        router.push("/movies");
      } catch (err) {
        toast.error("Failed to update movie");
      }
    }
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;
    if (!files) return;

    const file = files[0];
    if (!file) return;

    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg"
    ) {
      toast.error("Please select a PNG, JPG or JPEG image file.");
      return;
    }

    if (file.size > 1024 * 1024 * 2) {
      toast.error("File size should not exceed 2MB.");
      return;
    }

    setFile(file);
    const reader = new FileReader();
    reader.onload = () => setPoster(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageOpen = () => {
    if (poster) return;
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const id = router.query.id;

    console.log(moviesData);
    if (id) {
      const data = moviesData?.data[0];
      setTitle(data?.title || "");
      setPublishYear(data?.publish_year || "");
      setPoster(data?.poster || "");
    }
  }, [moviesData]);

  return (
    <MovieWrapper>
      <Header>
        <Title>{id ? <>Edit</> : <>Create a new movie</>}</Title>
      </Header>

      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col-reverse md:flex-row w-full gap-6 lg:gap-12">
          <div className="aspect-[1/1] max-w-[420px] w-full rounded-[10px]">
            {poster ? (
              <div className="h-full flex-col flex flex-1">
                <img src={poster} className="object-contain w-full h-80" />
                <button
                  className="bg-primary mt-4"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Another
                </button>
              </div>
            ) : (
              <div
                className="w-full h-full flex-1 rounded-[10px] cursor-pointer bg-neutral border border-dashed flex flex-col items-center justify-center gap-3"
                onClick={handleImageOpen}
              >
                <FiDownload />
                <p className="text-sm font-normal">Drop an image here</p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleFileChange}
          />

          <div className="flex flex-col items-start justify-start w-full gap-10">
            <div className="flex flex-col items-start justify-start w-full gap-6">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="number"
				  placeholder="Publishing Year"
				  className="!w-[50%]"
                value={publishYear}
				  onChange={(e) => parseInt( e.target.value  )>= 0 && setPublishYear(e.target.value)}
              />
            </div>
            <div className="hidden md:flex items-start justify-start w-full gap-5">
              <button
                className="border font-bold border-white max-w-[167px] hover:bg-accent"
                onClick={() => router.push("/movies")}
              >
                Cancel
              </button>
              <button
                className="bg-primary max-w-[167px] cursor-pointer font-bold "
                onClick={handleForm}
              >
                {id ? <>Update</> : <>Submit</>}
              </button>
            </div>
          </div>
        </div>

        <div className="flex md:hidden items-start justify-start w-full gap-5">
          <button
            className="border font-bold border-white hover:bg-accent"
            onClick={() => router.push("/movies")}
          >
            Cancel
          </button>
          <button className="bg-primary font-bold" onClick={handleForm}>
            {id ? <>Update</> : <>Submit</>}
          </button>
        </div>
      </div>
      <Toaster />
    </MovieWrapper>
  );
}

export default AddMovieContainer;
