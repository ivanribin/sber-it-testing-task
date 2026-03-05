import { ITask } from "@domains/Task";

export interface ITasksStore {
    add: (task: ITask) => Promise<void> | void;
    update: (task: ITask) => Promise<void> | void;
    delete: (id: ITask["id"]) => Promise<void> | void;
    get: (id: ITask["id"]) => Promise<ITask> | ITask;
    getAll: () => Promise<ITask[]> | ITask[];
}
