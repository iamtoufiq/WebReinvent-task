import { ChangeEvent } from "react";
import { RxCross2 } from "react-icons/rx";
interface SearchBoxProps {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
  queries: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  handleSearch,
  clearSearch,
  queries,
}) => {
  return (
    <div className="flex  items-center gap-4 flex-col lg:flex-row my-6 justify-center">
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 min-w-fit">
        User Management Dashboard
      </h2>

      <div className="relative flex items-center border w-full h-fit">
        <input
          type="text"
          onChange={handleSearch}
          value={queries}
          placeholder="search by name or email"
          className="w-full outline-none border border-gray-300 rounded-sm py-[6px] px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm  sm:leading-6"
        />
        {!!queries && (
          <span
            className="absolute right-0 pr-3 cursor-pointer"
            onClick={clearSearch}
          >
            <RxCross2 size={24} />
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
