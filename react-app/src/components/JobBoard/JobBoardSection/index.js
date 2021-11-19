
import { Draggable, Droppable } from 'react-beautiful-dnd'

import TaskBlock from '../TaskBlock'

export default function JobBoardSection({ section, tasks, index }) {
    return (
        <Draggable draggableId={section.id} index={index}>
            {provided => (
                <div className="job-board-section" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <p>{section.title}</p>
                    <Droppable droppableId={section.id} type="task">
                        {provided => (
                            <div className={section.id + '-task-area'} {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks
                                    ? tasks.map((task, index) => {
                                        return <TaskBlock key={task.id} task={task} index={index} />
                                    })
                                    : <p>no tasks yet</p>
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>

            )}
        </Draggable>
    )
}
