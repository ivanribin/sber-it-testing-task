import { useSimulation } from "@hooks/useSimulation";
import { ChangeEvent, ReactElement } from "react";
import "./style.css";

const SPEED_LABELS = ["Slow", "Normal", "Fast"];
const SPEED_IN_MILLISECONDS_MULTIPLIER = 500;
const MAX_SPEED = 3;
const MIN_SPEED = 1;
const STEP = 1;

const SimulationSpeedInput = (): ReactElement => {
    const { intervalBetweenEvents, updateIntervalBetweenEvents } =
        useSimulation();

    const sliderValue =
        MAX_SPEED -
        Math.floor(intervalBetweenEvents / SPEED_IN_MILLISECONDS_MULTIPLIER) +
        1;

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = Number(event.target.value);

        updateIntervalBetweenEvents(
            (MAX_SPEED - value + 1) * SPEED_IN_MILLISECONDS_MULTIPLIER,
        );
    };

    return (
        <div className="range-input-speed">
            <div className="title">{`Simulation Speed`}</div>
            <input
                type="range"
                min={MIN_SPEED}
                max={MAX_SPEED}
                step={STEP}
                value={sliderValue}
                onChange={handleChange}
                className="range-slider"
            />
            <div className="range-labels">
                {SPEED_LABELS.map((label, index) => (
                    <span key={index} className="range-label">
                        {label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SimulationSpeedInput;
