import tasksMockAggregator from "@api/TasksMockAggregator";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (_, { rejectWithValue }) => {
        try {
            const tasks = await tasksMockAggregator.getTasks();

            return tasks;
        } catch (error: unknown) {
            return rejectWithValue(
                `Failed to fetch tasks: ${(error as Error).message}`,
            );
        }
    },
);

export const fetchTask = createAsyncThunk(
    "tasks/fetchTask",
    async (id: string, { rejectWithValue }) => {
        try {
            const task = await tasksMockAggregator.getTask(id);

            return task;
        } catch (error: unknown) {
            return rejectWithValue(
                `Task ${id} not found: ${(error as Error).message}`,
            );
        }
    },
);
