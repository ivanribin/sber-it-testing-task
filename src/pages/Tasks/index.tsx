import useTasks from "@hooks/useTasks";
import DummyBlock from "@components/DummyBlock";
import TaskDetails from "@components/TaskDetails";
import LoaderBlock from "@components/LoaderBlock";

const TasksPage = () => {
    const { tasks, isLoading, error } = useTasks();

    if (isLoading) {
        return (
            <div className="page">
                <LoaderBlock label="Loading tasks..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="page">
                <DummyBlock label={`Error on loading tasks: ${error}`} />
            </div>
        );
    }

    if (!tasks.length) {
        return (
            <div className="page">
                <DummyBlock label="No tasks available" />
            </div>
        );
    }

    return (
        <div className="page container with-content task-list">
            <h1 className="title">Tasks List</h1>

            {tasks.map((task) => (
                <TaskDetails key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TasksPage;
