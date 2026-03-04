import { ITask, TaskStatuses } from "@domains/Task";
import { Bar } from "react-chartjs-2";
import { ReactElement } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface ITaskStatusBarProps {
    tasks: ITask[];
}

const TaskStatusBar = ({ tasks }: ITaskStatusBarProps): ReactElement => {
    const statusCounts: Record<TaskStatuses, number> = {
        [TaskStatuses.CREATED]: 0,
        [TaskStatuses.IN_PROGRESS]: 0,
        [TaskStatuses.COMPLETED]: 0,
    };

    tasks.forEach((task) => {
        statusCounts[task.status]++;
    });

    const data = {
        labels: Object.keys(statusCounts),
        datasets: [
            {
                label: "Tasks count",
                data: Object.values(statusCounts),
                backgroundColor: ["#2563eb", "#f59e0b", "#16a34a"],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="task-status-bar card">
            <h3>Tasks Comparison</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default TaskStatusBar;
