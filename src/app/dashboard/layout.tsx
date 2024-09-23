"use client";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { SideNav } from "../components/SideNav";
import { AddTaskForm } from "../components/AddTaskForm";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  function handleShowAddTask() {
    console.log("clicked!");
    setShowOverlay(!showOverlay);
    setShowAddTask(!showAddTask);
  }

  return (
    <div className="h-full bg-[#F4F7FD] grid grid-cols-[280px_minmax(900px,_1fr)] relative">
      <Navbar onShowAddTask={handleShowAddTask} />
      <SideNav />
      {showAddTask && <AddTaskForm onShowAddTask={handleShowAddTask} />}
      {showOverlay && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-[#00000080]"
          onClick={handleShowAddTask}
        ></div>
      )}
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
