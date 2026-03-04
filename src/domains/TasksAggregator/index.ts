import { ITask } from "@domains/Task";

export enum TaskEventTypes {
    CREATED = "created",
    UPDATED = "updated",
    DELETED = "deleted",
}

export type TTaskEvent =
    | {
          type: TaskEventTypes.CREATED;
          task: ITask;
      }
    | {
          type: TaskEventTypes.UPDATED;
          task: ITask;
      }
    | {
          type: TaskEventTypes.DELETED;
          taskId: ITask["id"];
      };

export interface ITasksAggregator {
    subscribe: (callback: (event: TTaskEvent) => void) => () => boolean;
    getTasks(): Promise<ITask[]>;
    getTask(id: string): Promise<ITask>;
}

export interface ITaskStoreMethodsForSimulation {
    getRandomId: () => Promise<ITask["id"] | null>;
    getRandom: () => Promise<ITask | null>;
}
