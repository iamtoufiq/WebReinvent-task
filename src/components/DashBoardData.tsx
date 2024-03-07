interface DashBoardDataProps {
  data: Array<{
    id: number;
    avatar: string;
    first_name: string;
    last_name: string;
    email: string;
  }>;
}

const DashBoardData: React.FC<DashBoardDataProps> = ({ data }) => {
  return (
    <div className="relative overflow-x-auto ">
      {!data?.length ? (
        <h3 className="text-lg text-red-700 font-bold text-center">
          No Data found..
        </h3>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-collapse shadow-md">
          <thead className="font-semibold text-xs text-gray-700 uppercase bg-gray-100 border">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Avatar
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {!!data?.length &&
              data.map((value: any) => {
                return (
                  <tr className="bg-white border-b" key={value.id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900  "
                    >
                      <img
                        className="w-12 h-12 md:w-20 md:h-20 rounded-full object-cover"
                        src={value.avatar}
                        alt={`${value.first_name} ${value.last_name}`}
                      />
                    </th>
                    <td className="px-6 py-4">{`${value.first_name} ${value.last_name}`}</td>
                    <td className="px-6 py-4">{value.email}</td>
                    {/* <td className="px-6 py-4">$2999</td> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashBoardData;
