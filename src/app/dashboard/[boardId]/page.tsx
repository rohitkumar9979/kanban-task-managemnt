"use client";

import { Card } from "@/app/components/Card";
import { selectBoardById } from "@/app/lib/features/taskBoard/boardSlice";
import { useAppSelector } from "@/app/lib/hooks";

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

  return (
    <main>
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
                  />
                );
              })}
            </div>
          );
        })}
      </section>
    </main>
  );
}
