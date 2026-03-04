import ApplicationRoutes from "@router/index";
import { BrowserRouter } from "react-router";
import { type ReactElement } from "react";
import "./style.css";

const Application = (): ReactElement => {
    return (
        <BrowserRouter>
            <ApplicationRoutes />
        </BrowserRouter>
    );
};

export default Application;
