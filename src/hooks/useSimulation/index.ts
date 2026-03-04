import tasksMockAggregator from "@api/TasksMockAggregator";
import { useState } from "react";

export interface IUseSimulationProps {
    isRunning: boolean;
    toggleSimulation: () => void;
}

export const useSimulation = (): IUseSimulationProps => {
    const [isRunning, setIsRunning] = useState(
        tasksMockAggregator.getIsRunning(),
    );

    const toggleSimulation = () => {
        if (isRunning) {
            tasksMockAggregator.stop();

            setIsRunning(tasksMockAggregator.getIsRunning());

            return;
        }

        tasksMockAggregator.start();
        setIsRunning(tasksMockAggregator.getIsRunning());
    };

    return { isRunning, toggleSimulation };
};
