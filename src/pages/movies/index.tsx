import MoviesContainer from "@/components/movies/Container";
import MainLayout from "@/layouts/MainLayout";

function Movies() {
  return (
    <MainLayout>
      <MoviesContainer />
    </MainLayout>
  );
}

export default Movies;

export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = req.cookies.token; // Assuming the token is stored in a cookie

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Pass any props you need for the page
  };
}

