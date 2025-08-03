import React from "react";
import Image from "next/image";

export default function UserManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-secondary font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white text-white flex items-center px-[30px] py-[13px] rounded-t-[16px]">
        <div className="font-extrabold text-4xl tracking-tight mr-16">
          <Image src="/assets/logo.png" alt="PADEL UG" width={73} height={38} />
        </div>
        <div className="ml-auto flex items-center">
          <div className="relative">
            <input
              placeholder="Search records, actions or more"
              className="min-w-[472px] h-[32px] rounded-[8px] border border-[#E0E0E0] bg-white px-[16px] py-[8px] text-[14px] line-height-[20] text-[#717684]"
            />
            <span className="text-[#0F1324] bg-[#E0E0E0] flex items-center justify-center rounded-[5px] w-[18px] h-[20px] text-[14px] absolute right-[12px] top-[6px]">
              /
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-6">
          <Image
            src="/assets/icon/lead-icon.png"
            alt="User"
            width={20}
            height={20}
          />
          <div className="w-[32px] h-[32px] rounded-full bg-[#717684] flex items-center justify-center text-lg text-[14px]">
            B
          </div>
        </div>
      </header>
      <nav className="px-[30px] py-[13px] flex justify-between bg-[#000000]">
        <div>
          <ul className="flex items-center gap-6">
            <li className="text-[#ffffff] text-[14px]">Home</li>
            <li className="text-[#ffffff] text-[14px]">Game Config</li>
            <li className="text-[#84CC16] text-[14px] font-bold">User Management</li>
            <li className="text-[#ffffff] text-[14px]">Announements</li>
          </ul>
        </div>
        <div className="flex items-center gap-1.5">
          <p className="text-[#ffffff] text-[14px]">Help</p>
          <Image src="/assets/icon/arrow-down-s-line.png" alt="Help" width={18} height={18} />
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-1 pt-[32px] px-[120px]">{children}</main>
    
    </div>
  );
}
