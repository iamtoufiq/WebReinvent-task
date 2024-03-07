import { ChangeEvent } from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  return (
    <div className="flex  items-center gap-4 flex-col lg:flex-row my-6 justify-center mx-auto">
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-800 min-w-fit order-1">
        User Management Dashboard
      </h2>

      <div className="relative flex items-center border w-full md:w-[40%] h-fit order-3 lg:order-2">
        <input
          type="text"
          onChange={handleSearch}
          value={queries}
          placeholder="search by name or email"
          className="w-full outline-none border border-gray-300 rounded-sm py-[6px] px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm  sm:leading-6"
        />
        {!!queries && (
          <span
            className="absolute right-0 pr-3 cursor-pointer text-[#b91c1c]"
            onClick={clearSearch}
          >
            <RxCross2 size={24} />
          </span>
        )}
      </div>

      <span className="order-2 lg:order-3">
        <Button
          onClick={() => {
            sessionStorage.removeItem("token");
            navigate("/signin");
          }}
        >
          Logout
        </Button>
      </span>
    </div>
  );
};

export default SearchBox;
