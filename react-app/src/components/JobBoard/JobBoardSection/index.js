
import { Droppable } from 'react-beautiful-dnd'

export default function JobBoardSection() {
    return (
        <Droppable droppableId={"job-board-todo"}>
            {provided => (
                <div id="job-board-todo" className="job-board-todo section">
                    <p className="todo-title">To-do</p>
                    {tasks.map((task, taskIndex) => {
                        if (task.status === "To-do") {
                            return <TaskBlock key={task.id} task={task} taskIndex={taskIndex} />
                        }
                        return null;
                    })}
                </div>
            )}
        </Droppable>
    )

}
