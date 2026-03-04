import AppHeader from "@components/AppHeader";
import { PropsWithChildren, ReactElement } from "react";
import "./style.css";

const AppLayout = ({ children }: PropsWithChildren): ReactElement => {
    return (
        <div className="application-layout">
            <AppHeader />
            <div className="content">{children}</div>
        </div>
    );
};

export default AppLayout;
