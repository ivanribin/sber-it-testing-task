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
    private simulationIntervalId: NodeJS.Timeout | null;
    private intervalBetweenEvents: number;

    constructor(
        intervalBetweenEvents = DEFAULT_SIMULATION_EVENTS_INTERVAL_IN_MILLISECONDS,
    ) {
        this.store = new TasksMockStore();
        this.events = new EventEmitter<TTaskEvent>();

        this.intervalBetweenEvents = intervalBetweenEvents;

        this.simulationIntervalId = setInterval(
            () => this.simulate().catch(console.error),
            intervalBetweenEvents,
        );
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

                break;
            }

            case TaskEventTypes.UPDATED: {
                const randomTaskFromStore: ITask | null =
                    await this.store.getRandom();

                if (!randomTaskFromStore) {
                    return;
                }

                randomTaskFromStore.status =
                    taskStatuses[
                        Math.floor(Math.random() * taskStatuses.length)
                    ];

                await this.store.update(randomTaskFromStore);
                this.events.emit({
                    type: TaskEventTypes.UPDATED,
                    task: randomTaskFromStore,
                });

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
    }

    public start(): void {
        if (this.simulationIntervalId) {
            return;
        }

        this.simulationIntervalId = setInterval(
            () => this.simulate().catch(console.error),
            this.intervalBetweenEvents,
        );
    }

    public getTasks(): Promise<ITask[]> {
        return Promise.resolve(this.store.getAll());
    }

    public getTask(id: string): Promise<ITask> {
        const task = this.store.get(id);
        if (!task) return Promise.reject("Task not found");
        return Promise.resolve(task);
    }

    public subscribe(callback: (event: TTaskEvent) => void) {
        return this.events.subscribe(callback);
    }
}

const tasksMockAggregator = new TasksMockAggregator();

export default tasksMockAggregator;
