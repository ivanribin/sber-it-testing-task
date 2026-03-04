import { TApplicationDispatch, TRootState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@store/slices/Tasks/thunks";
import { ITask } from "@domains/Task";
import { useEffect } from "react";
import {
    selectTasksIsLoading,
    selectTasksError,
    selectAllTasks,
} from "@store/slices/Tasks";

interface IUseTasksReturn {
    tasks: ITask[];
    isLoading: boolean;
    error?: string;
}

const useTasks = (): IUseTasksReturn => {
    const dispatch = useDispatch<TApplicationDispatch>();

    const tasks = useSelector((state: TRootState) => selectAllTasks(state));
    const isLoading = useSelector(selectTasksIsLoading);
    const error = useSelector(selectTasksError);

    useEffect(() => {
        if (tasks.length) {
            return;
        }

        dispatch(fetchTasks()).unwrap().catch(console.error);
    }, [dispatch, tasks.length]);

    useEffect(() => {
        console.log("REDUX TASKS: ", tasks);
    }, [tasks]);

    return {
        tasks,
        isLoading,
        error,
    };
};

export default useTasks;
