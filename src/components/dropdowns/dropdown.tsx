"use client";
import Image from "next/image";
import React from "react";

export default function Dropdown({ selectedValue }: { selectedValue: string }) {
  return (
    <div>
      <span className="inline-flex items-center bg-[#F8F8F8] rounded-[6px] px-[8px] py-[2px] border border-[#EFEFEF]">
        <p className="m-0 pr-[4px] text-[12px] text-[#000000]">{selectedValue}</p>
        <Image src={"./assets/icon/arrow.svg"} alt="arrow" width={16} height={16} />
      </span>
    </div>
  );
}
