import TasksPage from "@pages/Tasks";
import NotFoundPage from "@pages/NotFound";
import StatisticPage from "@pages/Statistic";
import ErrorBoundary from "@components/ErrorBoundary";
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

export interface INavigationPathData {
    id: string;
    path: string;
    label: string;
}

export const navigationPathsData: INavigationPathData[] = [
    {
        ...paths.TASKS,
        label: "Tasks",
    },
    {
        ...paths.STATISTIC,
        label: "Statistic",
    },
];

const routes: RouteObject[] = [
    {
        ...paths.HOME,
        element: <Navigate to={paths.TASKS.path} />,
    },
    {
        ...paths.TASKS,
        element: (
            <ErrorBoundary>
                <TasksPage />
            </ErrorBoundary>
        ),
    },
    {
        ...paths.STATISTIC,
        element: (
            <ErrorBoundary>
                <StatisticPage />
            </ErrorBoundary>
        ),
    },
    {
        ...paths.NOT_FOUND,
        element: <NotFoundPage />,
    },
];

export default routes;
