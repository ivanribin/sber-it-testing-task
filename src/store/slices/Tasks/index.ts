import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "@store/index";
import { fetchTasks } from "./thunks";
import { ITask } from "@domains/Task";

interface ITasksSliceState {
    tasks: Record<ITask["id"], ITask>;
    isLoading: boolean;
    error?: string;
}

const initialState: ITasksSliceState = {
    tasks: {},
    isLoading: false,
};

export const TasksSlice = createSlice({
    name: "TasksSlice",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            state.tasks = {
                ...state.tasks,
                [action.payload.id]: action.payload,
            };
        },
        updateTask: (state, action: PayloadAction<ITask>) => {
            if (!state.tasks[action.payload.id]) return;

            state.tasks = {
                ...state.tasks,
                [action.payload.id]: action.payload,
            };
        },
        deleteTask: (state, action: PayloadAction<ITask["id"]>) => {
            delete state.tasks[action.payload];
        },
        clearTasks: (state) => {
            state.tasks = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchTasks.fulfilled,
                (state, action: PayloadAction<ITask[]>) => {
                    state.isLoading = false;
                    action.payload.forEach(
                        (task) => (state.tasks[task.id] = task),
                    );
                },
            )
            .addCase(fetchTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addTask, updateTask, deleteTask, clearTasks } =
    TasksSlice.actions;

export const selectAllTasks = (state: TRootState) =>
    Object.values(state.tasks.tasks);

export const selectTaskById = (id: string) => (state: TRootState) =>
    state.tasks.tasks[id] || null;

export const selectTasksIsLoading = (state: TRootState): boolean =>
    state.tasks.isLoading;

export const selectTasksError = (state: TRootState): string | undefined =>
    state.tasks.error;

export default TasksSlice.reducer;
