export type TaskJson = {
  id: string;
  description: string;
  assignee: string;
  completed: boolean;
};

export type User = {
  name: string;
  isBoss: boolean;
};
