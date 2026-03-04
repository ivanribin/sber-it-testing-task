export enum TaskStatuses {
    CREATED = "created",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
}

export const taskStatuses: TaskStatuses[] = Object.values(TaskStatuses);

export interface ITask {
    id: string;
    status: TaskStatuses;
}
