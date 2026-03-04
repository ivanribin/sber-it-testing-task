import { ReactElement } from "react";
import "./style.css";

interface ILoaderBlockProps {
    label?: string;
    sizeRem?: number;
}

const DEFAULT_LOADER_SIZE_IN_REM: number = 3;

const LoaderBlock = ({
    label,
    sizeRem = DEFAULT_LOADER_SIZE_IN_REM,
}: ILoaderBlockProps): ReactElement => {
    return (
        <div className="loader-block card">
            {label && <div className="title">{label}</div>}
            <div
                className="loader-block__spinner"
                style={{
                    width: `${sizeRem}rem`,
                    height: `${sizeRem}rem`,
                }}
            />
        </div>
    );
};

export default LoaderBlock;
