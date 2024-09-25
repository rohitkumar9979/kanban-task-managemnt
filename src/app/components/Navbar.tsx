"use client";
import Image from "next/image";
import { useState } from "react";
import { AddTaskForm } from "./AddTaskForm";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "../lib/hooks";
import { selectBoardById } from "../lib/features/taskBoard/boardSlice";

export const Navbar = function () {
  const [showTask, setShowTask] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const path = usePathname();

  const boardId = path.split("/")[2];
  const board = useAppSelector((state) => selectBoardById(state, boardId));

  function handleShowTask() {
    console.log("clicked show sub task");
    setShowOverlay(!showOverlay);
    setShowTask(!showTask);
  }
  return (
    <nav className="flex justify-between p-4 items-center bg-white col-span-2">
      <div className="flex gap-2">
        <Link href={"/"}>
          <Image
            src="/logo-mobile.svg"
            alt="board-icon"
            width={36}
            height={36}
            className="mr-3"
          />
          <h3 className="text-xl font-bold">kanban</h3>
        </Link>
      </div>

      <h1 className="text-xl font-bold">{board?.name}</h1>

      <div className="text-white flex items-center gap-2">
        <button
          className="font-bold text-xl bg-[#6355c7] p-2 rounded-3xl mr-4"
          onClick={handleShowTask}
        >
          + Add New Task
        </button>
        <img
          src="/icon-vertical-ellipsis.svg"
          alt="options"
          width={6}
          height={6}
        />
      </div>
      {showTask && <AddTaskForm />}
      {showOverlay && (
        <div
          className="absolute top-0 bottom-0 right-0 left-0 bg-[#00000080] z-10"
          onClick={handleShowTask}
        ></div>
      )}
    </nav>
  );
};
