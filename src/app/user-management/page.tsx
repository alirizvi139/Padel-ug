"use client";
import Image from "next/image";
import React, { useRef, useState, useMemo, useEffect } from "react";
import Search from "@/components/inputComp/search";
import Dropdown from "@/components/dropdowns/dropdown";
import Table from "@/components/tables/datatable";
import { useUsers } from "@/hooks/user";
import { debounce } from "lodash";

export default function UserManagement() {
  const [srch, setSrch] = useState("");
  const { data } = useUsers(srch);

  const dataTableRef = useRef<{ handleAdd: () => void }>(null);
  const [disableAdd, setDisableAdd] = useState(false);

  const callChildHandleAdd = () => {
    dataTableRef.current?.handleAdd();
  };

  const debouncedSearch = useMemo(
    () => debounce((search: string) => setSrch(search), 300), // 300ms debounce
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const search = (search: string) => {
    debouncedSearch(search);
  };

  return (
    <section>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[24px] font-bold">Manage Users</h1>
          <p className="text-[14px] text-[#717684] mt-[4px]">
            This is a collection of all users in the system, you can search,
            modify, and add new users.
          </p>
        </div>
        <button
          key={disableAdd.toString()}
          className={`${
            !disableAdd ? "bg-[#65A30D]" : "bg-[#65A30D]/50"
          } text-white px-[18px] py-[8px] rounded-[8px] flex items-center text-nowrap`}
        >
          <Image
            src="/assets/icon/plus.png"
            alt="Add"
            width={16}
            height={16}
            className="mr-[8px]"
          />
          <span
            onClick={() => {
              if (!disableAdd) {
                callChildHandleAdd();
                setDisableAdd(true);
              }
            }}
            className={`text-[14px] font-bold ${
              disableAdd ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Add User
          </span>
        </button>
      </div>
      <div className="bg-white rounded-[10px] mt-[24px] border border-[#EFEFEF]">
        <div className="p-[14px]">
          <Search search={search} />
        </div>
        <div className="border-t border-[#EFEFEF] flex px-[14px] py-[11px] gap-[10px]">
          <Dropdown selectedValue="Approval" />
          <Dropdown selectedValue="Rank" />
          <Dropdown selectedValue="Status" />
          <Dropdown selectedValue="Sort by" />
        </div>
        <Table
          ref={dataTableRef}
          data={data || []}
          setDisableAdd={(e) => {
            console.log("e___", e);
            setDisableAdd(e);
          }}
        />
      </div>
    </section>
  );
}
