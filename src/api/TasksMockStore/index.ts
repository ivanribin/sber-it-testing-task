import { ITaskStoreMethodsForSimulation } from "./../../domains/TasksAggregator/index";
import { ITasksStore } from "@domains/TasksStore";
import { ITask } from "@domains/Task";

class TasksMockStore implements ITasksStore, ITaskStoreMethodsForSimulation {
    private tasks = new Map<string, ITask>();

    public add(task: ITask) {
        this.tasks.set(task.id, task);
    }

    public update(task: ITask) {
        if (!this.tasks.has(task.id)) {
            throw new Error("Task with this id not exist!");
        }

        this.tasks.set(task.id, task);
    }

    public delete(id: string) {
        this.tasks.delete(id);
    }

    public getAll(): ITask[] {
        return [...this.tasks.values()];
    }

    public get(id: string): ITask {
        const currentTask: ITask | undefined = this.tasks.get(id);

        if (!currentTask) {
            throw new Error("Task with this id not exist!");
        }

        return currentTask;
    }

    public getRandom(): Promise<ITask | null> {
        return new Promise((resolve) => {
            const tasks: ITask[] = [...this.tasks.values()];

            if (!tasks.length) {
                resolve(null);
            }

            resolve(tasks[Math.floor(Math.random() * tasks.length)]);
        });
    }

    public getRandomId(): Promise<string | null> {
        return new Promise((resolve) => {
            const keys: string[] = [...this.tasks.keys()];

            if (!keys.length) {
                resolve(null);
            }

            resolve(keys[Math.floor(Math.random() * keys.length)]);
        });
    }
}

export default TasksMockStore;
