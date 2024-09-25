"use client";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  selectAllBoards,
  selectBoardById,
} from "../lib/features/taskBoard/boardSlice";
import Link from "next/link";
import overlaySlice, {
  showOverlay,
} from "../lib/features/overlay/overlaySlice";
import { usePathname } from "next/navigation";

export const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const boards = useAppSelector(selectAllBoards);
  const dispatch = useAppDispatch();

  const path = usePathname();

  const boardId = path.split("/")[2] || "1";
  const board = useAppSelector((state) => selectBoardById(state, boardId));
  console.log(board);
  function handleCreateBoardClick() {
    dispatch(showOverlay());
  }

  return (
    <section
      className={` border-cyan-800 h-screen bg-white ${
        isOpen ? "hidden" : ""
      } relative`}
    >
      <h2 className=" text-gray-600 font-semibold mb-3 p-3">{`ALL BOARDS (${boards.length}) `}</h2>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          {boards.map((board) => {
            return (
              <Link href={`/dashboard/${board.id}`} key={board.id}>
                <div
                  className={`flex items-center gap-2 hover:bg-[#635fc71a] hover:text-[#635fc7] ${
                    board.id === boardId
                      ? "bg-[#6355c7] text-white"
                      : "text-black"
                  }   w-[240px] p-4 rounded-tr-3xl rounded-br-3xl`}
                >
                  <Image src="/icon-board.svg" alt="" width={16} height={16} />
                  <button className="font-bold text-xl">{board?.name}</button>
                </div>
              </Link>
            );
          })}
          <div className="flex items-center gap-2 hover:bg-[#635fc71a]  text-[#635fc7]  w-[240px] p-4 rounded-tr-3xl rounded-br-3xl">
            <Image src="/icon-board.svg" alt="" width={16} height={16} />
            <button
              className="font-bold text-xl"
              onClick={handleCreateBoardClick}
            >
              Create New Board
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-200 w-[240px] p-4 rounded-tr-3xl rounded-br-3xl">
          <Image
            src="/icon-hide-sidebar.svg"
            alt="hide-sidebar icon"
            width={16}
            height={16}
          />

          <button
            className="font-bold text-xl text-gray-500 "
            onClick={() => setIsOpen(!isOpen)}
          >
            Hide Sidebar
          </button>
          {/* <div className="w-64">
            <Image
              src="/icon-show-sidebar.svg"
              alt="show sidebar icon"
              width={16}
              height={16}
            />
          </div> */}
        </div>
      </div>
      <div className="absolute bottom-5 rounded-tr-3xl rounded-br-3xl">
        <Image
          src="/icon-show-sidebar.svg"
          alt="show-sidebar icon"
          width={16}
          height={16}
        />
      </div>
    </section>
  );
};
