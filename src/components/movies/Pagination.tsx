export type PaginationProps = {
  total: number;
  page: number;
  prev: () => void;
  next: () => void;
  jumpToPage: (nextPage: number) => void;
};

function Pagination(props: PaginationProps) {
  const { page, total, prev, next, jumpToPage } = props;

  return (
    <div className="mx-auto w-min flex items-center justify-center gap-4 py-12 font-montserrat">
      <button onClick={prev} disabled={page === 1}>
        Prev
      </button>
      <div className="flex items-center justify-center gap-3">
        {Array.from(new Array(total)).map((_, index) => (
          <button
            key={index}
            className={`w-[32px] h-[32px] text-white rounded-[4px] ${
              page === index + 1 ? "bg-primary" : "bg-accent"
            }`}
            onClick={() => jumpToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button onClick={next} disabled={page >= total}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
