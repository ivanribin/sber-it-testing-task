import TasksSlice from "@store/slices/Tasks";
import ApplicationSlice from "@store/slices/Application";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        application: ApplicationSlice,
        tasks: TasksSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TApplicationDispatch = typeof store.dispatch;

export default store;
