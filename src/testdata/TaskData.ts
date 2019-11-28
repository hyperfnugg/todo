import {TaskJson} from "../Tasks/Tasks.types";

export class TaskData {
    t : Partial<TaskJson>;

    constructor(t = {}) {
        this.t = t;
    }
}

export const task = new TaskData();
