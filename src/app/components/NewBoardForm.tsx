"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const NewBoardForm = () => {
  const [content, setContent] = useState([
    { id: uuidv4(), content: "Todo" },
    { id: uuidv4(), content: "Doing" },
  ]);

  function handleAddContent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContent((prevContent) => [
      ...prevContent,
      { id: uuidv4(), content: "" },
    ]);
  }

  function handleRemoveContent(id: string) {
    setContent(content.filter((c) => c.id !== id));
  }

  return (
    <div className="absolute top-1/4 left-2/4 bg-white w-[420px] p-6 rounded-md ">
      <h2 className="font-bold mb-4">Add New Board</h2>
      <form className="flex flex-col gap-6">
        <div>
          <label htmlFor="board-name" className="block font-semibold">
            Board Name
          </label>
          <input
            type="text"
            name="board-name"
            id="board-name"
            className="w-full p-3 border border-purple-500"
            placeholder="e.g Web Design"
          />
        </div>
        <p className="font-semibold">Board Columns</p>
        {content.map((content) => {
          return (
            <div className="flex items-center mb-2" key={content.id}>
              <input
                type="text"
                placeholder={content.content}
                className="w-full p-3 border border-purple-500 mr-2"
              />
              <img
                src="/icon-cross.svg"
                alt="close task icon"
                className="w-3 h-3 pointer"
                onClick={() => handleRemoveContent(content.id)}
              />
            </div>
          );
        })}
        <div>
          <button className="bg-[#6355c7] p-3 rounded-3xl text-white w-full mb-2">
            + Add New Column
          </button>
          <button className="bg-[#6355c7] p-3 rounded-3xl text-white w-full">
            Create New Board
          </button>
        </div>
      </form>
    </div>
  );
};
