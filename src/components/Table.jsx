import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-left">
            {columns.map((col, idx) => (
              <th key={idx} className="py-3 px-4 font-semibold text-gray-700">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500 dark:text-gray-400"
              >
                No users found.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td className="py-2 px-4">{row.name}</td>
                <td className="py-2 px-4">{row.email}</td>
                <td className="py-2 px-4">{row.role}</td>

                <td className="py-2 px-4">
                  <button className="text-blue-600 hover:underline mr-3">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
