import MovieWrapper from "../MovieWrapper";
import Header from "../Header";
import Title from "../Title";
import { FiDownload } from "react-icons/fi";

function AddMovieContainer() {
  return (
    <MovieWrapper>
      <Header>
        <Title>Create a new movie </Title>
      </Header>

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-12">
        <div className="aspect-[1/1] w-full rounded-[10px] cursor-pointer bg-neutral border border-dashed flex flex-col items-center justify-center gap-3">
          <FiDownload />
          <p className="text-sm">Drop an image here</p>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-10">
          <div className="flex flex-col items-start justify-start w-full gap-6">
            <input type="text" placeholder="Title" />
            <input type="number" placeholder="Publishing Year" />
          </div>
          <div className="flex items-start justify-start w-full gap-5">
            <button className="border border-white max-w-[167px] hover:bg-accent">
              Cancel
            </button>
            <button className="bg-primary max-w-[167px]">Submit</button>
          </div>
        </div>
      </div>
    </MovieWrapper>
  );
}

export default AddMovieContainer;
