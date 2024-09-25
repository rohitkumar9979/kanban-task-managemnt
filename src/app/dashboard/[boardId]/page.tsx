"use client";

import { Card } from "@/app/components/Card";
import { CreateBoardForm } from "@/app/components/CreateBoardForm";
import { SubTaskForm } from "@/app/components/SubTaskForm";
import { hideOverlay } from "@/app/lib/features/overlay/overlaySlice";
import { selectBoardById } from "@/app/lib/features/taskBoard/boardSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import React from "react";
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
  const board = useAppSelector((state) => selectBoardById(state, boardId));

  const [currentSelectedTask, setCurrentSelectedTask] = useState(null);
  const isOverlayVisible = useAppSelector(
    (state: RootState) => state.overlay.isOverlayVisible
  );
  const dispatch = useAppDispatch();

  function handleHideOverlayClick() {
    dispatch(hideOverlay());
  }

  function handleShowAddSubTask(task: any): any {
    setCurrentSelectedTask(task);
  }

  return (
    <main className="relative min-h-full">
      <section
        className={`grid h-full ${
          board?.columns.length === 1
            ? "grid-cols-1"
            : board?.columns.length === 2
            ? "grid-cols-2"
            : board?.columns.length === 3
            ? "grid-cols-3"
            : board?.columns.length === 4
            ? "grid-cols-4"
            : board?.columns.length === 5
            ? "grid-cols-5"
            : "grid-cols-6" // Add more cases if needed
        }`}
      >
        {board?.columns.map((column) => {
          return (
            <React.Fragment key={column.id}>
              {currentSelectedTask && (
                <SubTaskForm
                  task={currentSelectedTask}
                  onCloseCallback={() => {
                    setCurrentSelectedTask(null);
                  }}
                />
              )}
              <div>
                <h2 className="font-bold text-xl">{column.name}</h2>
                {column.tasks.map((task) => {
                  const finishedTaskCount = task.subtasks.reduce(
                    (acc, subtask) => (subtask.isCompleted ? (acc += 1) : acc),
                    0
                  );
                  return (
                    <div key={task.id}>
                      <Card
                        key={task.id}
                        title={task.title}
                        total={task.subtasks.length}
                        finished={finishedTaskCount}
                        onShowSubTask={() => handleShowAddSubTask(task)}
                      />
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
      </section>
      {isOverlayVisible && (
        <div
          className="absolute top-0 bottom-0 right-0 left-0 bg-[#00000080]"
          onClick={handleHideOverlayClick}
        ></div>
      )}
      {isOverlayVisible && <CreateBoardForm />}
    </main>
  );
}
