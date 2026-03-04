import mockTasks from "./meta";
import IdService from "@services/IdService";
import TasksMockStore from "@api/TasksMockStore";
import EventEmitter from "@services/EventEmitter";
import { ITask, taskStatuses, TaskStatuses } from "@domains/Task";
import { ITasksStore } from "@domains/TasksStore";
import {
    ITasksAggregator,
    ITaskStoreMethodsForSimulation,
    TaskEventTypes,
    TTaskEvent,
} from "@domains/TasksAggregator";

const DEFAULT_SIMULATION_EVENTS_INTERVAL_IN_MILLISECONDS: number = 2000;

class TasksMockAggregator implements ITasksAggregator {
    private store: ITasksStore & ITaskStoreMethodsForSimulation;
    private events: EventEmitter<TTaskEvent>;
    private isRunning: boolean;
    private simulationIntervalId: NodeJS.Timeout | null;
    private intervalBetweenEvents: number;

    constructor(
        initTasks: ITask[] = mockTasks,
        intervalBetweenEvents: number = DEFAULT_SIMULATION_EVENTS_INTERVAL_IN_MILLISECONDS,
    ) {
        this.store = new TasksMockStore(initTasks);
        this.events = new EventEmitter<TTaskEvent>();

        this.intervalBetweenEvents = intervalBetweenEvents;

        this.simulationIntervalId = setInterval(
            () => this.simulate().catch(console.error),
            intervalBetweenEvents,
        );
        this.isRunning = true;
    }

    private async simulate(): Promise<void> {
        const actions = Object.values(TaskEventTypes);
        const action = actions[Math.floor(Math.random() * actions.length)];

        switch (action) {
            case TaskEventTypes.CREATED: {
                const newTask: ITask = {
                    id: IdService.generateUniqueId(),
                    status: TaskStatuses.CREATED,
                };

                await this.store.add(newTask);
                this.events.emit({
                    type: TaskEventTypes.CREATED,
                    task: newTask,
                });

                console.info(`[TASK CREATED] :`, newTask);

                break;
            }

            case TaskEventTypes.UPDATED: {
                const randomTaskFromStore: ITask | null =
                    await this.store.getRandom();

                if (!randomTaskFromStore) {
                    return;
                }

                const updatedTask: ITask = {
                    ...randomTaskFromStore,
                    status: taskStatuses[
                        Math.floor(Math.random() * taskStatuses.length)
                    ],
                };

                await this.store.update(updatedTask);
                this.events.emit({
                    type: TaskEventTypes.UPDATED,
                    task: randomTaskFromStore,
                });

                console.info(`[TASK UPDATED] :`, updatedTask);

                break;
            }

            case TaskEventTypes.DELETED: {
                const randomTaskIdFromStore: string | null =
                    await this.store.getRandomId();

                if (!randomTaskIdFromStore) {
                    return;
                }

                await this.store.delete(randomTaskIdFromStore);
                this.events.emit({
                    type: TaskEventTypes.DELETED,
                    taskId: randomTaskIdFromStore,
                });

                console.info(`[TASK DELETED] by id:`, randomTaskIdFromStore);

                break;
            }
        }
    }

    public stop(): void {
        if (!this.simulationIntervalId) {
            return;
        }

        clearInterval(this.simulationIntervalId);
        this.simulationIntervalId = null;
        this.isRunning = false;
    }

    public start(): void {
        if (this.simulationIntervalId) {
            return;
        }

        this.simulationIntervalId = setInterval(
            () => this.simulate().catch(console.error),
            this.intervalBetweenEvents,
        );
        this.isRunning = true;
    }

    public getTasks(): Promise<ITask[]> {
        return Promise.resolve(this.store.getAll());
    }

    public getTask(id: string): Promise<ITask> {
        const task = this.store.get(id);

        if (!task) {
            return Promise.reject("Task not found");
        }

        return Promise.resolve(task);
    }

    public getIsRunning(): boolean {
        return this.isRunning;
    }

    public getIntervalBetweenEvents(): number {
        return this.intervalBetweenEvents;
    }

    public setIntervalBetweenEvents(intervalBetweenEvents: number): void {
        this.intervalBetweenEvents = intervalBetweenEvents;

        this.stop();
        this.start();
    }

    public subscribe(callback: (event: TTaskEvent) => void) {
        return this.events.subscribe(callback);
    }
}

const tasksMockAggregator = new TasksMockAggregator();

export default tasksMockAggregator;
