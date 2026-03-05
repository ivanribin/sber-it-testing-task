import mockTasks from "./meta";
import IdService from "@services/IdService";
import TasksMockStore from "@api/TasksMockStore";
import EventEmitter from "@services/EventEmitter";
import RandomService, { TWeightedOption } from "@services/RandomService";
import { ITask, taskStatuses, TaskStatuses } from "@domains/Task";
import { ITasksStore } from "@domains/TasksStore";
import {
    ITasksAggregator,
    ITaskStoreMethodsForSimulation,
    TaskEventTypes,
    TTaskEvent,
} from "@domains/TasksAggregator";

export interface ITasksMockAggregatorConfig {
    withInstantlyStart: boolean;
}

const defaultTasksMockAggregatorConfig: ITasksMockAggregatorConfig = {
    withInstantlyStart: true,
};

const DEFAULT_SIMULATION_EVENTS_INTERVAL_IN_MILLISECONDS: number = 1000;

const eventsRandomConfig: TWeightedOption<TaskEventTypes>[] = [
    { value: TaskEventTypes.CREATED, probability: 0.2 },
    { value: TaskEventTypes.UPDATED, probability: 0.6 },
    { value: TaskEventTypes.DELETED, probability: 0.2 },
];

class TasksMockAggregator implements ITasksAggregator {
    private store: ITasksStore & ITaskStoreMethodsForSimulation;
    private events: EventEmitter<TTaskEvent>;
    private isRunning: boolean;
    private simulationIntervalId: NodeJS.Timeout | null;
    private intervalBetweenEvents: number;

    constructor(
        initTasks: ITask[] = mockTasks,
        intervalBetweenEvents: number = DEFAULT_SIMULATION_EVENTS_INTERVAL_IN_MILLISECONDS,
        config: ITasksMockAggregatorConfig = defaultTasksMockAggregatorConfig,
    ) {
        this.store = new TasksMockStore(initTasks);
        this.events = new EventEmitter<TTaskEvent>();

        this.intervalBetweenEvents = intervalBetweenEvents;

        if (!config.withInstantlyStart) {
            this.simulationIntervalId = null;
            this.isRunning = false;

            return;
        }

        this.simulationIntervalId = setInterval(
            () => this.simulate().catch(console.error),
            intervalBetweenEvents,
        );
        this.isRunning = true;
    }

    private async createEvent(): Promise<void> {
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
    }

    private async updateEvent(): Promise<void> {
        const randomTaskFromStore: ITask | null = await this.store.getRandom();

        if (!randomTaskFromStore) {
            return;
        }

        const availableStatuses: TaskStatuses[] = taskStatuses.filter(
            (status) => status !== randomTaskFromStore.status,
        );

        const updatedTask: ITask = {
            ...randomTaskFromStore,
            status: availableStatuses[
                Math.floor(Math.random() * availableStatuses.length)
            ],
        };

        await this.store.update(updatedTask);
        this.events.emit({
            type: TaskEventTypes.UPDATED,
            task: updatedTask,
        });

        console.info(`[TASK UPDATED] :`, updatedTask);
    }

    private async deleteEvent(): Promise<void> {
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
    }

    private async simulate(): Promise<void> {
        switch (RandomService.getRandomWeighted(eventsRandomConfig)) {
            case TaskEventTypes.CREATED: {
                await this.createEvent();

                break;
            }

            case TaskEventTypes.UPDATED: {
                await this.updateEvent();

                break;
            }

            case TaskEventTypes.DELETED: {
                await this.deleteEvent();

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
