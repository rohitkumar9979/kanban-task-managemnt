export interface SubTask {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: SubTask[];
}

export interface BoardColumn {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  isActive: boolean;
  columns: BoardColumn[];
}

export interface Boards {
  boards: Board[];
}
