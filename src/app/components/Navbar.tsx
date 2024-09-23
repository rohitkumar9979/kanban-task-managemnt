"use client";
import Image from "next/image";

type NavbarProps = {
  onShowAddTask: () => void;
};

export const Navbar = function ({ onShowAddTask }: NavbarProps) {
  return (
    <nav className="flex justify-between p-4 items-center bg-white col-span-2">
      <div className="flex gap-2">
        <Image
          src="/logo-mobile.svg"
          alt="board-icon"
          width={36}
          height={36}
          className="mr-3"
        />
        <h3 className="text-xl font-bold">kanban</h3>
      </div>

      <h1 className="text-xl font-bold">Platform Launch</h1>

      <div
        className="text-white flex items-center gap-2"
        onClick={onShowAddTask}
      >
        <button className="font-bold text-xl bg-[#6355c7] p-2 rounded-3xl mr-4">
          + Add New Task
        </button>
        <img
          src="/icon-vertical-ellipsis.svg"
          alt="options"
          width={6}
          height={6}
        />
      </div>
    </nav>
  );
};
