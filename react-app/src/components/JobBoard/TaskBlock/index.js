
import "./TaskBlock.css";

export default function TaskBlock({ task }) {

    function drag(e) {
        e.dataTransfer.setData("text", e.target.id);
    }

    return (
        <div id={"task-block-" + task.id} className="task-block" draggable={true} onDragStart={(e) => drag(e)}>
            <p>{task.title}</p>
        </div>
    )
}
