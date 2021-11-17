
import TaskBlock from "./TaskBlock";
import "./JobBoard.css";

export default function JobBoard({ tasks }) {

    function allowDrop(e) {
        e.preventDefault();
    };

    function onDrop(e) {
        e.preventDefault();
        const taskBlock = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(taskBlock))
    };

    return (
        <div className="job-board">
            <div className="job-board-todo section" onDragOver={(e) => allowDrop(e)} onDrop={(e) => onDrop(e)}>
                <p className="todo-title">To-do</p>
                {tasks.map((task) => {
                    if (task.status === "To-do") {
                        return <TaskBlock key={task.id} task={task} />
                    }
                    return null;
                })}
            </div>
            <div className="job-board-in-progress section" onDragOver={(e) => allowDrop(e)} onDrop={(e) => onDrop(e)}>
                <p className="in-progress-title">In Progress</p>
                {tasks.map((task) => {
                    if (task.status === "In Progress") {
                        return <TaskBlock key={task.id} task={task} />
                    }
                    return null;
                })}
            </div>
            <div className="job-board-completed section" onDragOver={(e) => allowDrop(e)} onDrop={(e) => onDrop(e)}>
                <p className="completed-title">Complete</p>
                {tasks.map((task) => {
                    if (task.status === "Complete") {
                        return <TaskBlock key={task.id} task={task} />
                    }
                    return null;
                })}
            </div>
        </div>
    )
}
