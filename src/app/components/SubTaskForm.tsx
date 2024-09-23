import React from "react";
import Image from "next/image";

export const SubTaskForm = () => {
  return (
    <div className="absolute top-1/2 bg-white w-[500px] p-12 left-1/4 rounded-xl z-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-3">
          Buidling UI for onboarding flow
        </h2>
        <Image
          src="/icon-vertical-ellipsis.svg"
          alt="option icon"
          width={6}
          height={6}
        />
      </div>
      <p className="text-gray-500 font-medium mb-3">Subtasks (0 of 3)</p>
      <div className="flex flex-col gap-2 w-80 mb-4">
        <div className="flex gap-3 items-center">
          <input type="checkbox" name="signup" id="signup" />
          <label htmlFor="signup">Sign up Page</label>
        </div>
        <div className="flex gap-3 items-center">
          <input type="checkbox" name="signin" id="signin" />
          <label htmlFor="signin">Sign in Page</label>
        </div>
      </div>
      <div>
        <p className="text-gray-500 font-medium mb-3">Current Status</p>
        <select
          name="current-status"
          id="current-status"
          className="w-full p-2"
        >
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
  );
};
