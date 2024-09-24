export interface SubTask {
  id: number;
  name: string;
  isCompleted: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  subtasks: SubTask[];
}

export interface BoardColumn {
  id: number;
  name: string;
  tasks: Task[];
}

export interface Board {
  id: number;
  name: string;
  isActive: boolean;
  columns: BoardColumn[];
}

export interface Boards {
  boards: Board[];
}
