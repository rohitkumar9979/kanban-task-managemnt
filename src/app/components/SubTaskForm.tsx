import React, { useState } from "react";
import Image from "next/image";
import { SubTask } from "../lib/types";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  moveTask,
  removeTask,
  selectBoardById,
} from "../lib/features/taskBoard/boardSlice";

type SubTaskFormProps = {
  task: any;
  onCloseCallback: Function;
};

export const SubTaskForm = ({ task, onCloseCallback }: SubTaskFormProps) => {
  const path = usePathname();
  // const subtasks = task.subtasks.map(({ id, isCompleted }) => {
  //   return { id, isCompleted };
  // });
  // console.log(subtasks);
  // const [selectedOption, setSelectedOption] = useState("");
  const finishedTaskCount = task.subtasks.reduce(
    (acc, subtask) => (subtask.isCompleted ? (acc += 1) : acc),
    0
  );
  const existingTask = { ...task };

  const boardId = path.split("/")[2];
  const board = useAppSelector((state) => selectBoardById(state, boardId));
  const dispatch = useAppDispatch();
  function handleGetSelectedOption(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOption = e.target.value;
    let existingColName = "";
    board?.columns.forEach((column) => {
      column.tasks.find(function (task) {
        if (task.id === existingTask.id) {
          existingColName = column.name;
        }
      });
    });
    const data = {
      existingTask,
      boardId,
      selectedOption,
      existingColName,
    };
    dispatch(removeTask(data));
    dispatch(moveTask(data));
  }

  return (
    <div
      className="absolute top-0 bottom-0 right-0 left-0 bg-[#00000080]"
      onClick={() => onCloseCallback()}
    >
      <div className="absolute top-1/2 bg-white w-[500px] p-12 left-1/4 rounded-xl z-10">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-3">{task.title}</h2>
          <Image
            src="/icon-vertical-ellipsis.svg"
            alt="option icon"
            width={6}
            height={6}
          />
        </div>
        <p>{task.description}</p>
        <p className="text-gray-500 font-medium mb-3">{`Subtasks (${finishedTaskCount} of ${task.subtasks.length})`}</p>
        <div className="flex flex-col gap-2 w-80 mb-4">
          {task.subtasks.map((subtask: any) => {
            // console.log(subtask);
            return (
              <div className="flex gap-3 items-center" key={subtask.id}>
                <input type="checkbox" defaultChecked={subtask.isCompleted} />
                <label htmlFor="signup">{subtask.name}</label>
              </div>
            );
          })}
        </div>
        <div>
          <p className="text-gray-500 font-medium mb-3">Current Status</p>
          <select
            name="current-status"
            id="current-status"
            className="w-full p-2"
            onChange={handleGetSelectedOption}
          >
            {board?.columns.map((col) => (
              <option key={col.id} value={col.name}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
