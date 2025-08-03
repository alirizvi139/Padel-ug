"use client";
import Image from "next/image";
import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import DataTableBase from "react-data-table-component";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Example icons, use your own or from assets
import CustomPagination from "./customPagination";
import UserDetailsPanel from "../userDetailsPanel";
import { IUser } from "../../../types/user";
import {
  useAddUser,
  useUpdateUser,
  useUsers,
  useDeleteUser,
} from "@/hooks/user";

const DataTable = forwardRef(
  (
    {
      data,
      setDisableAdd,
    }: { data: IUser[]; setDisableAdd: (disable: boolean) => void },
    ref
  ) => {
    const {
      mutate: addUser,
      isPending: isAddingUser,
      error: errorAddingUser,
      isSuccess: isAddingUserSuccess,
    } = useAddUser();
    const {
      mutate: updateUser,
      isPending: isUpdatingUser,
      error: errorUpdatingUser,
      isSuccess: isUpdatingUserSuccess,
    } = useUpdateUser();
    const {
      mutate: deleteUser,
      isPending: isDeletingUser,
      error: errorDeletingUser,
      isSuccess: isDeletingUserSuccess,
    } = useDeleteUser();
    const [open, setOpen] = useState(false);
    const [createFlag, setCreateFlag] = useState(false);

    const [selectedUser, setSelectedUser] = useState<IUser>({
      og_code: 0,
      name: "",
      profile_image: "",
      title: "",
      points: 0,
      attack: { pistol: 0, bomb: 0, dynamite: 0 },
      defence: 0,
      status: "",
      matches: 0,
      won: 0,
      approval: "",
      rank: 0,
    });
    const [user, setUser] = useState<IUser[]>(data || []);

    const [editMode, setEditMode] = useState({
      edit: false,
      id: 0,
    });

    useEffect(() => {
      console.log("editMode", editMode);
    }, [editMode]);

    const handleEdit = (key: string, value: string) => {
      setSelectedUser({ ...selectedUser, [key]: value });
    };

    const handleUpdate = (id: string) => {
      updateUser({ user: { ...selectedUser, approval: "Approved" }, id: id });
    };

    const handleAdd = () => {
      setCreateFlag(true);
      setEditMode({ edit: true, id: 0 });
      setUser([
        {
          og_code: 0,
          name: "",
          profile_image: "",
          title: "",
          points: 0,
          attack: { pistol: 0, bomb: 0, dynamite: 0 },
          defence: 0,
          status: "",
          matches: 0,
          won: 0,
          approval: "",
          rank: 0,
        },
        ...user,
      ]);
    };

    const handleCreate = () => {
      console.log("create", selectedUser);
      var og_code: number = data?.[data?.length - 1]?.og_code || 0;
      og_code++;
      console.log("og_code", og_code);
      addUser({ ...selectedUser, approval: "Approved", og_code: og_code });
      setDisableAdd(false);
    };

    const resetSelectedUser = () => {
      setSelectedUser({
        og_code: 0,
        name: "",
        profile_image: "",
        title: "",
        points: 0,
        attack: { pistol: 0, bomb: 0, dynamite: 0 },
        defence: 0,
        status: "",
        matches: 0,
        won: 0,
        approval: "",
        rank: 0,
      });
    };

    useEffect(() => {
      if (isAddingUserSuccess || isUpdatingUserSuccess) {
        setCreateFlag(false);
        setEditMode({ edit: false, id: 0 });
        setUser(user.filter((u) => u.og_code !== 0 && u.og_code !== 0));
        resetSelectedUser();
      }
    }, [isAddingUserSuccess, isUpdatingUserSuccess]);

    useImperativeHandle(ref, () => ({
      handleAdd,
    }));

    const columns = [
      {
        name: "OG Code",
        selector: (row: any) => row.ogCode,
        cell: (row: any) => {
          return <span>{row.og_code}</span>;
        },
        sortable: true,
        width: "110px",
      },
      {
        name: "Name",
        cell: (row: any) => {
          if (!(editMode.id == row.og_code && editMode.edit)) {
            return (
              <div className="flex items-center gap-2">
                <Image
                  src={row.profile_image || "/assets/avatars/2.png"}
                  alt={row.name}
                  width={20}
                  height={20}
                />
                <span>{row.name}</span>
              </div>
            );
          } else {
            return (
              <div className="flex-row items-center gap-2">
                <input
                  type="text"
                  className="w-full h-[30px] border border-[#E0E0E0] rounded-md px-2"
                  value={selectedUser.name}
                  placeholder="Enter Name"
                  onChange={(e) => handleEdit("name", e.target.value)}
                />
              </div>
            );
          }
        },
        sortable: true,
        width: "180px",
      },
      {
        name: "Title",
        selector: (row: any) => row.title,
        cell: (row: any) => {
          if (!(editMode.id == row.og_code && editMode.edit)) {
            return <span>{row.title}</span>;
          } else {
            return (
              <input
                type="text"
                className="w-full h-[30px] border border-[#E0E0E0] rounded-md px-2"
                placeholder="Enter Title"
                value={selectedUser.title}
                onChange={(e) => handleEdit("title", e.target.value)}
              />
            );
          }
        },
        sortable: true,
        width: "120px",
      },
      {
        name: "Rank",
        cell: (row: any) => {
          if (!(editMode.id == row.og_code && editMode.edit)) {
            return (
              <Image
                src={"/assets/icon/rank.png"}
                alt="Rank"
                width={24}
                height={24}
              />
            );
          } else {
            return (
              <input
                type="text"
                className="w-full h-[30px] border border-[#E0E0E0] rounded-md px-2"
                placeholder="Rank"
                value={selectedUser.rank}
                onChange={(e) => handleEdit("rank", e.target.value)}
              />
            );
          }
        },
        width: "70px",
      },
      {
        name: "Points",
        selector: (row: any) => row.points,
        sortable: true,
        width: "90px",
        cell: (row: any) => {
          if (!(editMode.id == row.og_code && editMode.edit)) {
            return (
              <div className="bg-[#F7FEE7] px-2 py-1 rounded w-full h-full flex items-center">
                {row.points}
              </div>
            );
          } else {
            return (
              <input
                type="text"
                className="w-full h-[30px] border border-[#E0E0E0] rounded-md px-2"
                placeholder="Points"
                value={selectedUser.points}
                onChange={(e) => handleEdit("points", e.target.value)}
              />
            );
          }
        },
      },
      {
        name: "Attack",
        cell: (row: any) => {
          if (!(editMode.id == row.og_code && editMode.edit)) {
            return (
              <div className="flex items-center gap-2 text-nowrap">
                {/* Replace with your icons */}
                {row.attack.pistol ? (
                  <span>🔫×{row.attack.pistol} </span>
                ) : null}
                {row.attack.bomb ? <span>💣×{row.attack.bomb} </span> : null}
                {row.attack.dynamite ? (
                  <span>🧨×{row.attack.dynamite}</span>
                ) : null}
              </div>
            );
          } else {
            return (
              <div className="grid items-center gap-2">
                <div className="flex text-nowrap gap-2">
                  <label className="text-[12px]">🔫</label>
                  <input
                    type="number"
                    className="w-full h-[30px] border border-[#E0E0E0] rounded-md px-2"
                    placeholder="Gun"
                    value={selectedUser?.attack?.pistol}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        attack: {
                          ...selectedUser.attack,
                          pistol: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>
                <div className="flex text-nowrap gap-2">
                  <label className="text-[12px]">💣</label>
                  <input
                    type="number"
                    className="w-full h-[30px] border border-[#E0E0E0] rounded-md px-2"
                    placeholder="Bomb"
                    value={selectedUser?.attack?.bomb}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        attack: {
                          ...selectedUser.attack,
                          bomb: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>
                <div className="flex text-nowrap gap-2">
                  <label className="text-[12px]">🧨</label>
                  <input
                    type="number"
                    className="w-full h-[30px] border border-[#E0E0E0] rounded-md px-2"
                    placeholder="Dynamite"
                    value={selectedUser?.attack?.dynamite}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        attack: {
                          ...selectedUser.attack,
                          dynamite: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>
              </div>
            );
          }
        },
        width: "110px",
      },
      {
        name: "Defence",
        cell: (row: any) => {
          if (!(editMode.id == row.og_code && editMode.edit)) {
            return <span>🛡️×{row.defence}</span>;
          } else {
            return (
              <input
                type="number"
                className="w-full h-[30px] border border-[#E0E0E0] rounded-md px-2"
                placeholder="Defence"
                value={selectedUser.defence}
                onChange={(e) => handleEdit("defence", e.target.value)}
              />
            );
          }
        },
        width: "90px",
      },
      {
        name: "Status",
        selector: (row: any) => row.status,
        cell: (row: any) => {
          if (!(editMode.id == row.og_code && editMode.edit)) {
            return <span>{row.status}</span>;
          } else {
            return (
              <select
                className="w-full h-[30px] border border-[#E0E0E0] rounded-md px-2"
                value={selectedUser.status}
                onChange={(e) => handleEdit("status", e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Scull">Scull</option>
                <option value="Ripple">Ripple</option>
                <option value="Jail">Jail</option>
              </select>
            );
          }
        },
        width: "90px",
      },
      {
        name: "Matches",
        selector: (row: any) => row.matches,
        cell: (row: any) => {
          if (!(editMode.id == row.og_code && editMode.edit)) {
            return <span>{row.matches}</span>;
          } else {
            return (
              <input
                type="number"
                className="w-full h-[30px] border border-[#E0E0E0] rounded-md px-2"
                placeholder="Matches"
                value={selectedUser.matches}
                onChange={(e) => handleEdit("matches", e.target.value)}
              />
            );
          }
        },
        width: "90px",
      },
      {
        name: "Won",
        cell: (row: any) => {
          if (!(editMode.id == row.og_code && editMode.edit)) {
            return <span>{row.won}</span>;
          } else {
            return (
              <input
                type="number"
                className="w-full h-[30px] border border-[#E0E0E0] rounded-md px-2"
                placeholder="Won"
                onChange={(e) => handleEdit("won", e.target.value)}
              />
            );
          }
        },
        selector: (row: any) => row.won,
        width: "90px",
      },
      {
        name: "Approval",
        cell: (row: any) => {
          if (!(editMode.id == row.og_code && editMode.edit)) {
            return (
              <span
                className={`px-2 py-1 rounded ${
                  row.approval === "Approved"
                    ? "bg-green-100 text-green-600"
                    : row.approval === "Pending"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {row.approval}
              </span>
            );
          } else {
            return (
              <input
                type="text"
                disabled={true}
                className="w-full h-[30px] border border-[#E0E0E0] rounded-md px-2"
                placeholder="Approval"
              />
            );
          }
        },
        width: "110px",
      },
      {
        name: "Actions",
        cell: (row: any) => {
          if (!(editMode.id == row.og_code && editMode.edit)) {
            return (
              <div className="flex gap-2 text-[#65A30D]">
                <Image
                  onClick={() => {
                    setOpen(true);
                    setSelectedUser(row);
                  }}
                  src="/assets/icon/eye.svg"
                  alt="View"
                  width={20}
                  height={20}
                />
                <Image
                  onClick={() => {
                    setEditMode({ edit: true, id: row.og_code });
                    setSelectedUser(row);
                  }}
                  src="/assets/icon/pencil.svg"
                  alt="Edit"
                  width={20}
                  height={20}
                />
                <Image
                  onClick={() => {
                    deleteUser(row.id);
                  }}
                  src="/assets/icon/trash.svg"
                  alt="Delete"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
                <Image
                  src="/assets/icon/3dots.svg"
                  alt="options"
                  width={20}
                  height={20}
                />
                {/* Add more actions as needed */}
              </div>
            );
          } else {
            return createFlag ? (
              <button
                onClick={() => {
                  handleCreate();
                }}
                className="bg-[#65A30D] text-white px-4 py-2 rounded-md"
              >
                Create
              </button>
            ) : (
              <button
                onClick={() => {
                  handleUpdate(row.id);
                }}
                className="bg-[#65A30D] text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            );
          }
        },
        width: "110px",
      },
    ];

    useEffect(() => {
      setUser(data || []);
    }, [data]);

    const errorMessages = (errorAddingUser as any)?.detail?.map?.(
      (err: any, idx: number) => (
        <li key={idx} style={{ color: "red" }}>
          {err.msg}
        </li>
      )
    );

    return (
      <div className="">
        <ul className="pl-10 list-disc">
          {(errorAddingUser as any)?.detail && (
            <div style={{ marginBottom: 16 }}>{errorMessages}</div>
          )}
        </ul>
        <UserDetailsPanel
          user={selectedUser || ({} as IUser)}
          toggle={open}
          onToggle={() => setOpen(!open)}
        />
        <DataTableBase
          columns={columns}
          data={user || []}
          pagination
          paginationComponent={CustomPagination as any}
          highlightOnHover
          pointerOnHover
          onRowDoubleClicked={(row) => {
            setEditMode({ edit: true, id: row.og_code });
            setSelectedUser(row as IUser);
          }}
          customStyles={{
            headCells: {
              style: {
                // fontWeight: "bold",
                fontSize: "12px", // changed from 15px to 12px
                background: "#fafafa",
                color: "#6D6F7A",
                // padding: "10px",
              },
            },
            cells: {
              style: {
                fontSize: "12px", // changed from 14px to 12px
                // padding: "10px",
              },
            },
          }}
        />
      </div>
    );
  }
);

export default DataTable;
