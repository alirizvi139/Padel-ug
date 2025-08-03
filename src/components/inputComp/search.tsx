"use client";
import Image from "next/image";
import React from "react";

export default function Search({ search }: { search: (search: string) => void  }) {
  

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search by username, name and more"
        className="w-full bg-transparent text-[12px] text-[#000000] placeholder:text-[#CCCCCC] outline outline-[1px] outline-[#cccccc94] p-[5px] rounded-[5px] pl-[35px]"
        onKeyUp={(e) => {
          search(e.currentTarget.value);
        }}
      />
      <Image
        src="./assets/icon/search.svg"
        alt="Search"
        width={14}
        height={14}
        className="absolute left-[13px] top-[50%] translate-y-[-50%]"
      />
    </div>
  );
}
