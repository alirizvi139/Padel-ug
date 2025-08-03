"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Accordion from "./accordions/accordion";
import { IUser } from "../../types/user";

interface UserDetailsPanelProps {
  user: IUser;
  toggle: boolean;
  onToggle: (toggle: boolean) => void;
}

const UserDetailsPanel = ({
  user,
  toggle,
  onToggle,
}: UserDetailsPanelProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex transition-all duration-300 ${
        toggle ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[#0000004d] transition-all duration-300 `}
      />
      {/* Side Panel */}
      <div
        className={` ml-auto w-full max-w-md bg-white h-full shadow-lg flex flex-col relative transition-all duration-300 rounded-tl-[10px] rounded-bl-[10px] ${
          toggle ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-[27px] py-[20px] border-b border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[24px]">User Details</h3>
            </div>
            <div className="flex">
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => {
                  onToggle(false);
                }}
                aria-label="Close"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Profie */}
        <div className="border-b border-[#E0E0E0] px-[27px] flex mt-[27px]">
          <div className="relative">
            <Image
              src={user.profile_image || "/assets/avatars/2.png"}
              alt="User Avatar"
              width={108}
              height={108}
              className="mr-[27px] mt-0"
            />

            <Image
              className="absolute bottom-[12px]"
              style={{
                left: "calc(50% - 12px)",
              }}
              src="./assets/icon/star.svg"
              alt="Edit"
              width={24}
              height={24}
            />
          </div>
          <div className="gap-[100px]">
            <h3 className="text-2xl font-bold text-[18px] mb-[8px]">
              {user.name}
            </h3>
            <p className="text-sm text-gray-500 mb-[8px]">
              OG Code: {user.og_code}
            </p>
            <p className="text-sm text-gray-500 mb-[8px]">
              Title: {user.title}
            </p>
            <p className="text-sm text-gray-500 mb-[8px]">Rank: {user.rank}</p>
          </div>
        </div>
        {/* Content */}
        <Accordion user={user} />
      </div>
    </div>
  );
};

export default UserDetailsPanel;
