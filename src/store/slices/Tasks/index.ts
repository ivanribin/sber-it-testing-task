import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTask, fetchTasks } from "./thunks";
import { TRootState } from "@store/index";
import { ITask } from "@domains/Task";

interface ITasksSliceState {
    tasks: Map<ITask["id"], ITask>;
    isLoading: boolean;
    error?: string;
}

const initialState: ITasksSliceState = {
    tasks: new Map(),
    isLoading: false,
};

export const TasksSlice = createSlice({
    name: "TasksSlice",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            state.tasks.set(action.payload.id, action.payload);
        },
        updateTask: (state, action: PayloadAction<ITask>) => {
            if (!state.tasks.has(action.payload.id)) {
                console.error("Task with this id not exist!");

                return;
            }

            state.tasks.set(action.payload.id, action.payload);
        },
        deleteTask: (state, action: PayloadAction<ITask["id"]>) => {
            state.tasks.delete(action.payload);
        },
        clearTasks: (state) => {
            state.tasks.clear();
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
                    action.payload.forEach((task) =>
                        state.tasks.set(task.id, task),
                    );
                },
            )
            .addCase(fetchTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchTask.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchTask.fulfilled,
                (state, action: PayloadAction<ITask>) => {
                    state.isLoading = false;
                    state.tasks.set(action.payload.id, action.payload);
                },
            )
            .addCase(fetchTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addTask, updateTask, deleteTask, clearTasks } =
    TasksSlice.actions;

export const selectAllTasks = (state: TRootState) =>
    Array.from(state.tasks.tasks.values());

export const selectTaskById = (id: string) => (state: TRootState) =>
    state.tasks.tasks.get(id);

export default TasksSlice.reducer;
