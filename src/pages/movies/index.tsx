import MoviesContainer from "@/components/movies/Container";
import MainLayout from "@/layouts/MainLayout";

function Movies() {
  return (
    <MainLayout>
      <h1 className="text-primary">Heading 1</h1>
      <h2 className="text-secondary">Heading 2</h2>
      <h3 className="text-base">Heading 3</h3>
      <h4 className="text-neutral">Heading 4</h4>
      <h5 className="text-accent">Heading 5</h5>
      <h6 className="">Heading 6</h6>

      <p className="text-lg">Body (Large)</p>
      <p className="text-md">Body (Regular)</p>
      <p className="text-sm">Body (Small)</p>
      <p className="text-xs">Body (Extra Small)</p>

      <MoviesContainer />
    </MainLayout>
  );
}

export default Movies;
