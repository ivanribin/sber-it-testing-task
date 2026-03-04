import { ITask } from "@domains/Task";
import "./style.css";

interface TaskDetailsProps {
    task: ITask;
}

const TaskDetails = ({ task }: TaskDetailsProps) => {
    return (
        <div className="task-details card">
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
