function NoDataView() {
  return (
    <div className="content-center flex flex-col justify-center p-6 ">
        <h3 className="mb-8 font-montserrat font-semibold text-center">Your movie list is empty</h3>
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <button className="bg-primary font-bold">Add a new movie</button>
        </div>
      </div>
  );
}

export default NoDataView;
