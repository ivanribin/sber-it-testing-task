import useTasks from "@hooks/useTasks";
import TaskDetails from "@components/TaskDetails";

const TasksPage = () => {
    const { tasks, isLoading, error } = useTasks();

    if (isLoading) return <div>Loading tasks...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!tasks.length) return <div>No tasks available</div>;

    return (
        <div className="container task-list">
            {tasks.map((task) => (
                <TaskDetails key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TasksPage;
