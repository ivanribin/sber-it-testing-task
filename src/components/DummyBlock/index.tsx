import { ReactElement } from "react";
import "./style.css";

interface IDummyBlockProps {
    label: string;
}

const DummyBlock = ({ label }: IDummyBlockProps): ReactElement => {
    return (
        <div className="dummy-block card">
            <span className="dummy-block__label">{label}</span>
        </div>
    );
};

export default DummyBlock;
