"use client";
import React from "react";
import Image from "next/image";

interface CustomPaginationProps {
  rowsPerPage: number;
  rowCount: number;
  onChangePage: (page: number) => void;
  currentPage: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  currentPage,
}) => {
  const totalPages = rowCount;
  const from = (currentPage * 10)-10;
  const to = currentPage * 10;

  return (
    <div className="flex justify-center items-center my-5">
      <div className="inline-flex items-center gap-4">
        <button
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            border: "none",
            background: "none",
            fontSize: 24,
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          <Image
            src={"./assets/icon/arrow-left.svg"}
            alt="Arrow Left"
            width={32}
            height={32}
          />
        </button>
        <span className="text-[#484B54] text-[12px]">
          {from}-{to} of {rowCount} entries
        </span>
        <button
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          style={{
            border: "none",
            background: "none",
            fontSize: 24,
            cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
          }}
        >
          <Image
            src={"./assets/icon/arrow-right.svg"}
            alt="Arrow Right"
            width={32}
            height={32}
          />
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
