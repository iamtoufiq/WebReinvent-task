import React, { useMemo } from "react";
interface ModalProps {
  data: Array<{
    id: number;
    avatar: string;
    first_name: string;
    last_name: string;
    email: string;
  }>;
  showModal: boolean;
  selectedId: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  data,
  setShowModal,
  selectedId,
}) => {
  // const showData = data?.find((currVal) => currVal.id === selectedId);
  const showData = useMemo(() => {
    return data.find((currVal) => currVal.id === selectedId) || null;
  }, [data, selectedId]);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl min-w-[90%] md:min-w-[50%] ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[95%] m-auto md:w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold m-auto w-full flex justify-center items-center">
                    <img
                      className="w-12 h-12 md:w-20 md:h-20 rounded-full object-cover border-2 border-[#c7bdbd]"
                      src={showData?.avatar}
                      alt={showData?.email}
                    />
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    <span className="font-bold"> Name: </span>{" "}
                    <span className="font-semibold">
                      {showData?.first_name ?? ""} {showData?.last_name ?? ""}
                    </span>
                  </p>
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    <span className="font-bold"> Email: </span>{" "}
                    <span className="font-semibold">{showData?.email}</span>
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
