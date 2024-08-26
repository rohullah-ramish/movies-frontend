import MovieWrapper from "../MovieWrapper";
import Header from "../Header";
import Title from "../Title";
import { FiDownload } from "react-icons/fi";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useAddMoviesMutation } from "@/services/movies";

function AddMovieContainer() {
  const [title, setTitle] = useState("");
  const [publish_year, setPublishYear] = useState(0);
  
  const [addMovies, { data: moviesData, error, isLoading }] =
    useAddMoviesMutation();

  const handleForm = async () => {
    if (title && publish_year) {
      try {
        const result = await addMovies({ title, publish_year }).unwrap();
        toast.success("Movie Added in Your List !")
        console.log("Movie added successfully:", result);
      } catch (err) {
        console.error("Failed to add movie:", err);
        toast.error("Failed to add movie")
      }
    }
  };

  return (
    <MovieWrapper>
      <Header>
        <Title>Create a new movie </Title>
      </Header>

      <div className="sm:gap-0 grid grid-cols-1 lg:grid-cols-2 w-full  md:gap-12">
        <div className="aspect-[1/1] w-full rounded-[10px] h-[calc(100%-10rem)] cursor-pointer bg-neutral border border-dashed flex flex-col items-center justify-center gap-3">
          <FiDownload />
          <p className="text-sm">Drop an image here</p>
        </div>
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
              value={publish_year}
              onChange={(e) => setPublishYear(Number(e.target.value))}
            />
          </div>
          <div className="flex items-start justify-start w-full gap-5">
            <button className="border border-white max-w-[167px] hover:bg-accent">
              Cancel
            </button>
            <button
              className="bg-primary max-w-[167px] cursor-pointer"
              onClick={handleForm}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </MovieWrapper>
  );
}

export default AddMovieContainer;
