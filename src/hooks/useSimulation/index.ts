import tasksMockAggregator from "@api/TasksMockAggregator";
import { useEffect, useState } from "react";

export interface IUseSimulationProps {
    isRunning: boolean;
    toggleSimulation: () => void;
    updateIntervalBetweenEvents: (interval: number) => void;
    intervalBetweenEvents: number;
}

export const useSimulation = (): IUseSimulationProps => {
    const [isRunning, setIsRunning] = useState<boolean>(
        tasksMockAggregator.getIsRunning(),
    );
    const [intervalBetweenEvents, setIntervalBetweenEvents] = useState<number>(
        tasksMockAggregator.getIntervalBetweenEvents(),
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

    const updateIntervalBetweenEvents = (interval: number): void => {
        tasksMockAggregator.setIntervalBetweenEvents(interval);
        setIntervalBetweenEvents(
            tasksMockAggregator.getIntervalBetweenEvents(),
        );
    };

    useEffect(() => {
        console.log(
            "INTERVAL: ",
            tasksMockAggregator.getIntervalBetweenEvents(),
        );
    }, [intervalBetweenEvents]);

    return {
        isRunning,
        toggleSimulation,
        intervalBetweenEvents,
        updateIntervalBetweenEvents,
    };
};
