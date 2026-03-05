import useTasks from "@hooks/useTasks";
import DummyBlock from "@components/DummyBlock";
import LoaderBlock from "@components/LoaderBlock";
import TaskStatusBar from "@components/TaskStatusBar";
import TaskStatusPie from "@components/TaskStatusPie";
import TasksSummaryCards from "@components/TasksSummaryCards";
import "./style.css";

const StatisticPage = () => {
    const { tasks, isLoading, error } = useTasks();

    if (isLoading) {
        return (
            <div className="page full-content-height">
                <LoaderBlock label="Loading tasks..." />
            </div>
        );
    }
    if (error) {
        return (
            <div className="page full-content-height">
                <DummyBlock label={`Error on loading tasks: ${error}`} />
            </div>
        );
    }

    if (!tasks.length) {
        return (
            <div className="page full-content-height">
                <DummyBlock label={`No tasks available`} />;
            </div>
        );
    }

    return (
        <div className="statistic-page page with-content container">
            <h1 className="title">Task Statistics</h1>

            <TasksSummaryCards tasks={tasks} />
            <div className="statistic-page__charts">
                <TaskStatusPie tasks={tasks} />
                <TaskStatusBar tasks={tasks} />
            </div>
        </div>
    );
};

export default StatisticPage;
