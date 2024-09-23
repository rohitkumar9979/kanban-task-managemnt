"use client";

import { v4 as uuidv4 } from "uuid";

import React, { useEffect, useReducer, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { addTask } from "../lib/features/taskBoard/boardSlice";
import { useAppDispatch } from "../lib/hooks";

export const AddTaskForm = () => {
  const [content, setContent] = useState([
    { id: uuidv4(), content: "e.g. Make a coffee", pending: true },
    { id: uuidv4(), content: "e.g. Drink coffee & smile", pending: true },
  ]);
  const subtasksRef = useRef([]);
  const searchParam = usePathname();
  const boardId = Number(searchParam.split("").slice(-1));
  const dispatch = useAppDispatch();
  // console.log(boardId);

  function handleAddContent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContent((prevContent) => [
      ...prevContent,
      { id: uuidv4(), content: "e.g. Make a coffee", pending: true },
    ]);
  }

  function handleRemoveContent(id: string) {
    setContent(content.filter((c) => c.id !== id));
  }
  /*
  {
    id: 1,
    name: "Todo",
    tasks: [
      {
        id: 1,
        title: "Build UI for onboarding flow",
        descripition: "making kanban task mgmt",
        subtasks: [
          {
            id: 1,
            name: "sign up",
            pending: true,
          },
        ],
      }
    ]
  }
    */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const subtaskValues = subtasksRef.current.map((input) => input.value);
    console.log("Form Submitted:", subtaskValues); // Logs all the subtask values
    const newTask = {
      boardId,
      moveTo: formData.get("status"),
      task: {
        id: uuidv4(),
        title: formData.get("title"),
        description: formData.get("description"),
        subtasks: [...subtaskValues],
      },
    };
    console.log(newTask);

    dispatch(addTask(newTask));
  }
  return (
    <div className="absolute top-8 left-2/4 bg-white w-[420px] p-6 rounded-md z-20">
      <h2 className="font-bold mb-4">Add New Task</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full p-3 border border-purple-500"
            placeholder="e.g. Take a coffee break"
            defaultValue={""}
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full p-3 border border-purple-500"
            defaultValue=""
            placeholder="e.g. It's always good to take a break. This 15 minute break will
            recharge the batteries a little."
            rows={4}
          ></textarea>
        </div>
        <div>
          <p className="font-semibold">Subtasks</p>
          <div className="subtask-content">
            {content.map((task, index) => {
              return (
                <div className="flex items-center mb-2" key={task.id}>
                  <input
                    type="text"
                    placeholder={task.content}
                    className="w-full p-3 border border-purple-500 mr-2 "
                    ref={(el) => (subtasksRef.current[index] = el)}
                    defaultValue={""}
                  />
                  <img
                    src="/icon-cross.svg"
                    alt="close task icon"
                    className="w-3 h-3 pointer"
                    onClick={() => handleRemoveContent(task.id)}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="bg-[#6355c7] p-3 rounded-3xl text-white w-full"
            onClick={handleAddContent}
          >
            + Add New Subtask
          </button>
        </div>
        <label htmlFor="status" className="font-semibold">
          Status
        </label>
        <select name="status" id="status" className="p-3">
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
        <button className="bg-[#6355c7] p-3 rounded-3xl text-white">
          Create Task
        </button>
      </form>
    </div>
  );
};
