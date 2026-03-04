import {
    CSSProperties,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";
import "./style.css";

interface AnimatedNumberProps {
    value: number;
}

const DEFAULT_ANIMATION_DELAY_IN_MILLISECONDS: number = 300;

const AnimatedNumber = ({ value }: AnimatedNumberProps): ReactElement => {
    const [prev, setPrev] = useState(value);
    const [current, setCurrent] = useState(value);
    const [animate, setAnimate] = useState(false);

    const timeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (value === current) {
            return;
        }

        setPrev(current);
        setCurrent(value);

        setAnimate(true);

        timeout.current = setTimeout(() => {
            setAnimate(false);
            setPrev(value);
        }, DEFAULT_ANIMATION_DELAY_IN_MILLISECONDS);
    }, [value, current]);

    useEffect(() => {
        return () => {
            if (!timeout.current) {
                return;
            }

            clearTimeout(timeout.current);
            timeout.current = null;
        };
    }, [value]);

    const animatedStyle: CSSProperties | undefined = !animate
        ? undefined
        : {
              transition: `transform ${DEFAULT_ANIMATION_DELAY_IN_MILLISECONDS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          };

    return (
        <div className="animated-number">
            <div
                className={`animated-number__wrapper ${
                    animate ? "animate" : ""
                }`}
                style={animatedStyle}
            >
                <span>{prev}</span>
                <span>{current}</span>
            </div>
        </div>
    );
};

export default AnimatedNumber;
