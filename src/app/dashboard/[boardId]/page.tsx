"use client";

import { Card } from "@/app/components/Card";
import { SubTaskForm } from "@/app/components/SubTaskForm";
import { selectBoardById } from "@/app/lib/features/taskBoard/boardSlice";
import { useAppSelector } from "@/app/lib/hooks";
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
  const board = useAppSelector((state) =>
    selectBoardById(state, Number(boardId))
  );

  const [currentSelectedTask, setCurrentSelectedTask] = useState(null);

  function handleShowAddSubTask(task: any): any {
    setCurrentSelectedTask(task);
  }

  return (
    <main className="relative min-h-full">
      <section className="grid grid-cols-3">
        {board?.columns.map((column) => {
          return (
            <>
              {currentSelectedTask && (
                <SubTaskForm
                  task={currentSelectedTask}
                  onCloseCallback={() => {
                    setCurrentSelectedTask(null);
                  }}
                />
              )}
              <div key={column.id}>
                <h2>{column.name}</h2>
                {column.tasks.map((task) => {
                  return (
                    <div key={task.id}>
                      <Card
                        key={task.id}
                        title={task.title}
                        total={4}
                        finished={2}
                        taskId={task.id}
                        onShowSubTask={() => handleShowAddSubTask(task)}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </section>
    </main>
  );
}
