import { useSimulation } from "@hooks/useSimulation";
import { ReactElement } from "react";
import "./style.css";

const ToggleSimulationButton = (): ReactElement => {
    const { isRunning, toggleSimulation } = useSimulation();

    const runningClassname: string = !isRunning ? "" : "running";

    return (
        <button
            className={`toggle-simulation-button button button-primary ${runningClassname}`}
            onClick={toggleSimulation}
        >
            {isRunning ? "Stop Simulation" : "Start Simulation"}
        </button>
    );
};

export default ToggleSimulationButton;
