import { useDispatch, useSelector } from "react-redux";
import DashBoardData from "../components/DashBoardData";
import { useEffect, useState } from "react";
import { fetchUserData } from "../redux/slice/userSlice";
import { AppDispatch } from "../redux/store";
import SearchBox from "../components/SearchBox";

const DashBoard = () => {
  const [queries, setQueries] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { data: originalData } = useSelector(
    (state: any) => state?.user?.userData || []
  );

  const debouncedSearch = debounce((query: string) => {
    setQueries(query);
  }, 200);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    debouncedSearch(query);
  };

  const filterData = () => {
    if (!queries) {
      return originalData;
    }

    const lowerCaseQuery = queries.toLowerCase();
    return originalData.filter(
      (item: any) =>
        item.email.toLowerCase().includes(lowerCaseQuery) ||
        `${item.first_name.toLowerCase()} ${item.last_name.toLowerCase()}`.includes(
          lowerCaseQuery
        )
    );
  };

  const filteredData = filterData();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  const clearSearch = () => {
    setQueries("");
  };
  if (!originalData || !Array.isArray(originalData)) {
    return null;
  }

  return (
    <div className="m-auto w-[95%]">
      <SearchBox
        handleSearch={handleSearch}
        clearSearch={clearSearch}
        queries={queries}
      />
      <DashBoardData data={filteredData} />
    </div>
  );
};

function debounce(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, 0);
  };
}

export default DashBoard;
