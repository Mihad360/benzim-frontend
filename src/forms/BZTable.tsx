/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type Column<T> = {
  key: keyof T | string;
  title: string;
  render?: (value: any, record: T) => React.ReactNode;
};

type BZTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

const BZTable = <T extends Record<string, any>>({
  columns,
  data,
}: BZTableProps<T>) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-md">
      <table className="w-full border-collapse">
        <thead className="bg-[#d49256] text-white">
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className="text-left px-4 py-2">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {columns.map((col) => (
                <td key={col.key as string} className="px-4 py-2">
                  {col.render
                    ? col.render(row[col.key as keyof T], row)
                    : (row[col.key as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BZTable;
