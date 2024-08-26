type Props = {
  resetSearchQuery: (query: string) => void;
};
function NoDataFoundView(props: Props) {
  const { resetSearchQuery } = props;
  return (
    <div className="content-center flex mx-auto h-screen  flex-col justify-center p-6 ">
      <h3 className="mb-8 font-montserrat font-semibold text-center">
        oop`s not result found !
      </h3>
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <button
          className="bg-primary font-bold cursor-pointer"
          onClick={() => resetSearchQuery("")}
        >
          Back to home
        </button>
      </div>
    </div>
  );
}

export default NoDataFoundView;
