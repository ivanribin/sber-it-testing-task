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
