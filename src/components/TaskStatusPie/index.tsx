import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ITask, TaskStatuses } from "@domains/Task";
import { Pie } from "react-chartjs-2";
import { ReactElement } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ITaskStatusPieProps {
    tasks: ITask[];
}

const TaskStatusPie = ({ tasks }: ITaskStatusPieProps): ReactElement => {
    const statusCounts: Record<TaskStatuses, number> = {
        [TaskStatuses.CREATED]: 0,
        [TaskStatuses.IN_PROGRESS]: 0,
        [TaskStatuses.COMPLETED]: 0,
    };

    tasks.forEach((task) => {
        statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
    });

    const data = {
        labels: Object.keys(statusCounts),
        datasets: [
            {
                label: "Tasks by Status",
                data: Object.values(statusCounts),
                backgroundColor: ["#2563eb", "#f59e0b", "#16a34a"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="task-status-pie card">
            <h3>Status Distribution</h3>
            <Pie data={data} />
        </div>
    );
};

export default TaskStatusPie;
