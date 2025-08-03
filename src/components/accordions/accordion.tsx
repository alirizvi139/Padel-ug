"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const Accordion = ({ user }: { user: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className="px-[27px] border-b border-[#E0E0E0] py-[21px]"
      onClick={handleToggle}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-[14px] font-bold text-[#000000]">Game Stats</h4>
        <Image
          src={
            isOpen
              ? "/assets/icon/arrow-top.svg"
              : "/assets/icon/arrow-down.svg"
          }
          alt="Arrow Down"
          width={18}
          height={18}
        />
      </div>
      {isOpen && (
        <div className="mt-[21px] grid gap-[12px] pb-5">
          <div className="flex items-center justify-between">
            <h4 className="text-[14px] text-[#000000]">Points</h4>
            <h4 className="text-[14px] text-[#000000]">{user.points}</h4>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="text-[14px] text-[#000000]">Wins</h4>
            <h4 className="text-[14px] text-[#000000]">{user.won}</h4>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="text-[14px] text-[#000000]">Matches</h4>
            <h4 className="text-[14px] text-[#000000]">{user.matches}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
