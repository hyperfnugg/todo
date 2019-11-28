import { TaskJson } from '../Tasks/Tasks.types';
import faker from 'faker';

let nextId = 0;

export class TaskData {
  t: Partial<TaskJson>;

  constructor(t = {}) {
    this.t = t;
  }

  private with = (newData: Partial<TaskJson>) =>
    new TaskData({ ...this.t, ...newData });
  id = (id: string) => this.with({ id });
  description = (description: string) => this.with({ description });
  assignee = (assignee: string) => this.with({ assignee });
  completed = (completed: boolean) => this.with({ completed });

  toJson = (): TaskJson => ({
    id: this.t.id || `generatedTaskId${nextId++}`,
    description: this.t.description || faker.lorem.sentence(),
    assignee: this.t.assignee || faker.name.findName(),
    completed: !!this.t.completed,
  });
}

export const task = new TaskData();
