import TriggerLabel from "@components/TriggerLabel";
import { useSimulation } from "@hooks/useSimulation";
import { ITask } from "@domains/Task";
import "./style.css";

interface ITaskDetailsProps {
    task: ITask;
}

const TaskDetails = ({ task }: ITaskDetailsProps) => {
    const { intervalBetweenEvents } = useSimulation();

    return (
        <div className="task-details card">
            <TriggerLabel
                label="Updated"
                dependency={task.status}
                duration={intervalBetweenEvents * 0.8}
            />
            <h2 className="task-details__title">Task Details</h2>
            <p className="task-details__field">
                <span className="task-details__label">ID:</span> {task.id}
            </p>
            <p className="task-details__field">
                <span className="task-details__label">Status:</span>{" "}
                {task.status}
            </p>
        </div>
    );
};

export default TaskDetails;
