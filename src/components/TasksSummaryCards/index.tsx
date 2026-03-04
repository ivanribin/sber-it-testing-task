import AnimatedNumber from "@components/AnimatedNumber";
import { ITask, TaskStatuses } from "@domains/Task";
import { ReactElement } from "react";
import "./style.css";

interface ITasksSummaryCardsProps {
    tasks: ITask[];
}

const TasksSummaryCards = ({
    tasks,
}: ITasksSummaryCardsProps): ReactElement => {
    const total = tasks.length;
    const completed = tasks.filter(
        (task: ITask) => task.status === TaskStatuses.COMPLETED,
    ).length;
    const inProgress = tasks.filter(
        (task: ITask) => task.status === TaskStatuses.IN_PROGRESS,
    ).length;

    const completedPercent = total ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="tasks-summary-cards">
            <div className="card">
                <div className="card__title">Total Tasks</div>
                <div className="card__value">
                    <AnimatedNumber value={total} />
                </div>
            </div>
            <div className="card">
                <div className="card__title">Completed</div>
                <div className="card__value">
                    <AnimatedNumber value={completed} />
                    {`/`}
                    <span className="card__value with-label">
                        <AnimatedNumber value={completedPercent} />
                        {`%`}
                    </span>
                </div>
            </div>
            <div className="card">
                <div className="card__title">In Progress</div>
                <div className="card__value">
                    <AnimatedNumber value={inProgress} />
                </div>
            </div>
        </div>
    );
};

export default TasksSummaryCards;
