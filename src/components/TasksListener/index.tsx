import tasksMockAggregator from "@api/TasksMockAggregator";
import { addTask, updateTask, deleteTask } from "@store/slices/Tasks";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import { TaskEventTypes } from "@domains/TasksAggregator";
import { useDispatch } from "react-redux";

export const TasksListener = ({ children }: PropsWithChildren): ReactNode => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = tasksMockAggregator.subscribe((event) => {
            switch (event.type) {
                case TaskEventTypes.CREATED:
                    dispatch(addTask(event.task));
                    break;
                case TaskEventTypes.UPDATED:
                    dispatch(updateTask(event.task));
                    break;
                case TaskEventTypes.DELETED:
                    dispatch(deleteTask(event.taskId));
                    break;
            }
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    return children;
};

export default TasksListener;
