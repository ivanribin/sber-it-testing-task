import { ReactElement, useEffect, useRef, useState } from "react";
import "./style.css";

interface TriggerLabelProps<TDependency> {
    label: string;
    dependency: TDependency;
    duration?: number;
    className?: string;
}

const DEFAULT_DURATION_IN_MILLISECONDS: number = 2000;

const TriggerLabel = <TDependency,>({
    label,
    dependency,
    duration = DEFAULT_DURATION_IN_MILLISECONDS,
    className = "",
}: TriggerLabelProps<TDependency>): ReactElement | null => {
    const [visible, setVisible] = useState(false);

    const isFirstRender = useRef<boolean>(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        setVisible(true);
        const timeoutId = setTimeout(() => setVisible(false), duration);

        return () => clearTimeout(timeoutId);
    }, [dependency, duration]);

    if (!visible) return null;

    return <div className={`trigger-label ${className}`}>{label}</div>;
};

export default TriggerLabel;
