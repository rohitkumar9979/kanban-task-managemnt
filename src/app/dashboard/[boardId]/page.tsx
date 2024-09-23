"use client";

import { Card } from "@/app/components/Card";
import { SubTaskForm } from "@/app/components/SubTaskForm";
import { selectBoardById } from "@/app/lib/features/taskBoard/boardSlice";
import { useAppSelector } from "@/app/lib/hooks";
import { useState } from "react";

type Params = {
  boardId: string;
};

type BoardProps = {
  params: Params;
  searchParams: URLSearchParams;
};

export default function Board({ params }: BoardProps) {
  const { boardId } = params;
  const board = useAppSelector((state) =>
    selectBoardById(state, Number(boardId))
  );
  const [showSubTask, setShowSubTask] = useState(false);

  const [showOverlay, setShowOverlay] = useState(false);

  function handleShowAddSubTask() {
    console.log("clicked show sub task");
    setShowOverlay(!showOverlay);
    setShowSubTask(!showSubTask);
  }

  return (
    <main className="relative min-h-full">
      <section className="grid grid-cols-3">
        {board?.columns.map((column) => {
          return (
            <div key={column.id}>
              <h2>{column.name}</h2>
              {column.tasks.map((task) => {
                return (
                  <Card
                    key={task.id}
                    title={task.title}
                    total={4}
                    finished={2}
                    onShowSubTask={handleShowAddSubTask}
                  />
                );
              })}
            </div>
          );
        })}
      </section>
      {showSubTask && <SubTaskForm />}
      {showSubTask && (
        <div
          className="absolute top-0 bottom-0 right-0 left-0 bg-[#00000080]"
          onClick={handleShowAddSubTask}
        ></div>
      )}
    </main>
  );
}
