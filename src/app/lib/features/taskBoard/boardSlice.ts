import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface SubTask {
  id: number;
  name: string;
  pending: boolean;
}

interface Task {
  id: number;
  title: string;
  description: string;
  subtasks: SubTask[];
}

interface BoardColumn {
  id: number;
  name: string;
  tasks: Task[];
}

interface Board {
  id: number;
  name: string;
  columns: BoardColumn[];
}

interface Boards {
  boards: Board[];
}
const initialState: Boards = {
  boards: [
    {
      id: 1,
      name: "Platform Launch",
      columns: [
        {
          id: 1,
          name: "Todo",
          tasks: [
            {
              id: 1,
              title: "Build UI for onboarding flow",
              description: "",
              subtasks: [
                {
                  id: 1,
                  name: "sign up",
                  pending: true,
                },
              ],
            },
            {
              id: 2,
              title: "Build UI for search",
              description: "",
              subtasks: [
                {
                  id: 1,
                  name: "Search page",
                  pending: false,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: "Doing",
          tasks: [
            {
              id: 1,
              title: "Writing test cases",
              description: "",
              subtasks: [
                {
                  id: 1,
                  name: "sign up",
                  pending: true,
                },
              ],
            },
          ],
        },
        {
          id: 3,
          name: "Done",
          tasks: [
            {
              id: 1,
              title: "Debugging add to cart",
              description: "",
              subtasks: [
                {
                  id: 1,
                  name: "sign up",
                  pending: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// {
// boardId,
// id: uuidv4(),
// title: formData.get("title"),
// description: formData.get("description"),
// moveTo: formData.get("status"),
// subtasks: [...content],
// }

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
  },
});

export default boardSlice.reducer;

export const selectAllBoards = (state: RootState) => state.board.boards;
export const selectBoardById = (state: RootState, boardId: number) =>
  state.board.boards.find((board) => board.id === boardId);

export const { addTask } = boardSlice.actions;
