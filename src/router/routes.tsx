import TaskPage from "@pages/Task";
import TasksPage from "@pages/Tasks";
import NotFoundPage from "@pages/NotFound";
import { type RouteObject } from "react-router";

export const paths = {
    TASK: {
        id: "task",
        path: "/task/:id",
    },
    TASKS: {
        id: "tasks",
        path: "/tasks",
    },
    NOT_FOUND: {
        id: "notFound",
        path: "*",
    },
};

const routes: RouteObject[] = [
    {
        ...paths.TASK,
        element: <TaskPage />,
    },
    {
        ...paths.TASKS,
        element: <TasksPage />,
    },
    {
        ...paths.NOT_FOUND,
        element: <NotFoundPage />,
    },
];

export default routes;
