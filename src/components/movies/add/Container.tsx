import MovieWrapper from "../MovieWrapper";
import Header from "../Header";
import Title from "../Title";
import { FiDownload } from "react-icons/fi";
import { ChangeEventHandler, useRef, useState } from "react";

function AddMovieContainer() {
  const [poster, setPoster] = useState<string | undefined>();

  const fileInputRef = useRef<HTMLInputElement>(null);

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
      alert("Please select a PNG, JPG or JPEG image file.");
      return;
    }

    if (file.size > 1024 * 1024 * 2) {
      alert("File size should not exceed 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPoster(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageOpen = () => {
    if (poster) return;

    fileInputRef.current?.click();
  };

  return (
    <MovieWrapper>
      <Header>
        <Title>Create a new movie </Title>
      </Header>

      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col-reverse md:flex-row w-full gap-6 lg:gap-12">
          <div
            className="aspect-[1/1] max-w-[420px] w-full rounded-[10px]"
            onClick={handleImageOpen}
          >
            {poster ? (
              <div className="">
                <img src={poster} className="object-cover w-full h-full" />
                <button className="bg-primary">Upload Another</button>
              </div>
            ) : (
              <div className="w-full h-full flex-1 rounded-[10px] cursor-pointer bg-neutral border border-dashed flex flex-col items-center justify-center gap-3">
                <FiDownload />
                <p className="text-sm">Drop an image here</p>
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
              <input type="text" placeholder="Title" />
              <input type="number" placeholder="Publishing Year" />
            </div>
            <div className="hidden md:flex items-start justify-start w-full gap-5">
              <button className="border border-white max-w-[167px] hover:bg-accent">
                Cancel
              </button>
              <button className="bg-primary max-w-[167px]">Submit</button>
            </div>
          </div>
        </div>

        <div className="flex md:hidden items-start justify-start w-full gap-5">
          <button className="border border-white hover:bg-accent">
            Cancel
          </button>
          <button className="bg-primary">Submit</button>
        </div>
      </div>
    </MovieWrapper>
  );
}

export default AddMovieContainer;
