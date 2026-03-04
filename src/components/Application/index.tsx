import ApplicationRoutes from "@router/index";
import TasksListener from "@components/TasksListener";
import { BrowserRouter } from "react-router";
import { type ReactElement } from "react";
import "@domains/Theme/style.css";

const Application = (): ReactElement => {
    return (
        <TasksListener>
            <BrowserRouter>
                <ApplicationRoutes />
            </BrowserRouter>
        </TasksListener>
    );
};

export default Application;
