import TasksPage from "@pages/Tasks";
import NotFoundPage from "@pages/NotFound";
import StatisticPage from "@pages/Statistic";
import { Navigate, type RouteObject } from "react-router";

export const paths = {
    HOME: {
        id: "home",
        path: "/",
    },
    TASKS: {
        id: "tasks",
        path: "/tasks",
    },
    STATISTIC: {
        id: "statistic",
        path: "/statistic",
    },
    NOT_FOUND: {
        id: "notFound",
        path: "*",
    },
};

const routes: RouteObject[] = [
    {
        ...paths.HOME,
        element: <Navigate to={paths.TASKS.path} />,
    },
    {
        ...paths.TASKS,
        element: <TasksPage />,
    },
    {
        ...paths.STATISTIC,
        element: <StatisticPage />,
    },
    {
        ...paths.NOT_FOUND,
        element: <NotFoundPage />,
    },
];

export default routes;
