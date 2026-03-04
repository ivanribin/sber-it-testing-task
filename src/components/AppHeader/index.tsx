import NavigationBar from "@components/NavigationBar";
import SimulationSpeedInput from "@components/SimulationSpeedInput";
import ToggleSimulationButton from "@components/ToggleSimulationButton";
import { ReactElement } from "react";
import "./style.css";

const AppHeader = (): ReactElement => {
    return (
        <header className="app-header">
            <div className="app-header__left">
                <NavigationBar />
            </div>
            <div className="app-header__right">
                <SimulationSpeedInput />
                <ToggleSimulationButton />
            </div>
        </header>
    );
};

export default AppHeader;
