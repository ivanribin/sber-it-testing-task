import useTasks from "@hooks/useTasks";
import TaskStatusBar from "@components/TaskStatusBar";
import TaskStatusPie from "@components/TaskStatusPie";
import TasksSummaryCards from "@components/TasksSummaryCards";
import "./style.css";

const StatisticPage = () => {
    const { tasks, isLoading, error } = useTasks();

    if (isLoading) return <div className="loading">Loading tasks...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!tasks.length) return <div>No tasks available</div>;

    return (
        <div className="statistic-page container">
            <h1 className="statistic-page__title">Task Statistics</h1>

            <TasksSummaryCards tasks={tasks} />
            <div className="statistic-page__charts">
                <TaskStatusPie tasks={tasks} />
                <TaskStatusBar tasks={tasks} />
            </div>
        </div>
    );
};

export default StatisticPage;
