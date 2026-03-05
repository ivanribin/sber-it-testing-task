import TasksSlice from "@store/slices/Tasks";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        tasks: TasksSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TApplicationDispatch = typeof store.dispatch;

export default store;
