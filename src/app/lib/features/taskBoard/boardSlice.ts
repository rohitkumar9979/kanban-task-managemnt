import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Boards } from "../../types";
import { v4 as uuidv4 } from "uuid";

const initialState: Boards = {
  boards: [
    {
      id: "1",
      name: "Platform Launch",
      isActive: false,
      columns: [
        {
          id: uuidv4(),
          name: "Todo",
          tasks: [
            {
              id: uuidv4(),
              title: "Build UI for onboarding flow",
              description: "",
              subtasks: [
                {
                  id: uuidv4(),
                  name: "sign up",
                  isCompleted: true,
                },
                {
                  id: uuidv4(),
                  name: "Log in",
                  isCompleted: false,
                },
              ],
            },
            {
              id: uuidv4(),
              title: "Build UI for search",
              description: "",
              subtasks: [
                {
                  id: uuidv4(),
                  name: "Search page",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: uuidv4(),
          name: "Doing",
          tasks: [
            {
              id: uuidv4(),
              title: "Writing test cases",
              description: "",
              subtasks: [
                {
                  id: uuidv4(),
                  name: "sign up",
                  isCompleted: true,
                },
              ],
            },
          ],
        },
        {
          id: uuidv4(),
          name: "Done",
          tasks: [
            {
              id: uuidv4(),
              title: "Debugging add to cart",
              description: "",
              subtasks: [
                {
                  id: uuidv4(),
                  name: "sign up",
                  isCompleted: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addTask(state, action) {
      console.log("adding task");
      state.boards
        .find((board) => board.id === action.payload.boardId)
        ?.columns.find((column) => column.name === action.payload.moveTo)
        ?.tasks.push(action.payload.task);
    },
    addBoard(state, action) {
      state.boards.push(action.payload);
    },
  },
});

export default boardSlice.reducer;

export const selectAllBoards = (state: RootState) => state.board.boards;
export const selectBoardById = (state: RootState, boardId: string) => {
  // console.log("Boardid passed to store: ", boardId);
  return state.board.boards.find((board) => board.id === boardId);
};
/*
export const selectColumnById = (state: RootState,boardId: number, columnId: number) => {
  const board = selectBoardById(state,boardId);
  return board?.columns.find(col => col.id === columnId);
};

export const selectSubTasksById = (state: RootState, boardId: number,taskId: number,columnId: number){
  const board = selectBoardById(state,boardId);
  const column = selectColumnById(state,boardId,columnId)
  return column?.tasks.find(task => task.id === taskId);
}
*/
export const { addTask, addBoard } = boardSlice.actions;
