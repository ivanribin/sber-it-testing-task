import NavigationBar from "@components/NavigationBar";
import { ReactElement } from "react";
import "./style.css";

const AppHeader = (): ReactElement => {
    return (
        <header className="app-header">
            <div className="app-header__left">
                <NavigationBar />
            </div>
            <div className="app-header__right">
                {/* Future buttons / icons */}
            </div>
        </header>
    );
};

export default AppHeader;
