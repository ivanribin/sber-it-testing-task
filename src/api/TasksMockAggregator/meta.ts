import { ITask, TaskStatuses } from "@domains/Task";

const mockTasks: ITask[] = [
    { id: "task-1", status: TaskStatuses.CREATED },
    { id: "task-2", status: TaskStatuses.IN_PROGRESS },
    { id: "task-3", status: TaskStatuses.COMPLETED },
    { id: "task-4", status: TaskStatuses.CREATED },
    { id: "task-5", status: TaskStatuses.IN_PROGRESS },
    { id: "task-6", status: TaskStatuses.COMPLETED },
    { id: "task-7", status: TaskStatuses.CREATED },
    { id: "task-8", status: TaskStatuses.IN_PROGRESS },
    { id: "task-9", status: TaskStatuses.COMPLETED },
    { id: "task-10", status: TaskStatuses.CREATED },
];

export default mockTasks;
