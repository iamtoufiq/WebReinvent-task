import { useDispatch, useSelector } from "react-redux";
import DashBoardData from "../components/DashBoardData";
import { useEffect, useState } from "react";
import { fetchUserData } from "../redux/slice/userSlice";
import { AppDispatch } from "../redux/store";
import SearchBox from "../components/SearchBox";
import Modal from "../components/Modal";

const DashBoard = () => {
  const [queries, setQueries] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { data: originalData } = useSelector(
    (state: any) => state?.user?.userData || []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    console.log(query);
    setQueries(query);
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

      <DashBoardData
        data={filteredData}
        setShowModal={setShowModal}
        setSelectedId={setSelectedId}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedId={selectedId}
        data={filteredData}
      />
    </div>
  );
};

export default DashBoard;
