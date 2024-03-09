// src/pages/DashBoard.tsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Action } from "redux";
import { RootState } from "../redux/store";
import { fetchData } from "../redux/actions/dataActions";
import DashBoardData from "../components/DashBoardData";
import SearchBox from "../components/SearchBox";
import Modal from "../components/Modal";
// import Loader from "../components/Loader";

const DashBoard: React.FC = () => {
  const [queries, setQueries] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const { data: originalData, loading } = useSelector(
    (state: RootState) => state.data
  ) || { data: undefined };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await dispatch(fetchData());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQueries(query);
  };

  const filterData = () => {
    if (!Array.isArray(originalData)) {
      return [];
    }

    if (!queries) {
      return originalData;
    }

    const lowerCaseQuery = queries.toLowerCase();
    return originalData.filter(
      (item) =>
        item.email.toLowerCase().includes(lowerCaseQuery) ||
        `${item.first_name.toLowerCase()} ${item.last_name.toLowerCase()}`.includes(
          lowerCaseQuery
        )
    );
  };

  const filteredData = filterData();

  const clearSearch = () => {
    setQueries("");
  };

  const handleSetSelectedId = (id: number | null) => {
    setSelectedId(id !== null ? id : null);
  };

  return (
    <div className="m-auto w-[95%]">
      {loading ? (
        <h1 className="text-sky-500 h-screen flex justify-center items-center text-2xl font-bold">
          Loading..
        </h1>
      ) : (
        <>
          <SearchBox
            handleSearch={handleSearch}
            clearSearch={clearSearch}
            queries={queries}
          />

          <DashBoardData
            data={filteredData}
            setShowModal={setShowModal}
            setSelectedId={handleSetSelectedId}
          />

          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            selectedId={selectedId!}
            data={filteredData}
          />
        </>
      )}
    </div>
  );
};

export default DashBoard;
