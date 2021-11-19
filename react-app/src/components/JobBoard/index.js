import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import TaskBlock from "./TaskBlock";
import AddTaskModal from "./AddTaskModal";
import "./JobBoard.css";

export default function JobBoard({ tasks }) {

    function handleOnDragEnd(result) {
        const { destination, source, draggableId, type } = result;
        console.log("destination", destination);
        console.log("source", source);
        console.log("draggableId", draggableId);
        console.log("type", type);

    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="job-board-all-sections">
                {provided => (
                    <div className="job-board" {...provided.droppableProps} ref={provided.innerRef}>
                        <div id="job-board-todo" className="job-board-todo section">
                            <p className="todo-title">To-do</p>
                            <div className="job-board-todo-tasks" index={0}>
                                {tasks?.filter(task => task.status === "To-do")?.map((task, index) => {
                                    return <TaskBlock key={task.id} task={task} taskIndex={index} />
                                })}
                                {provided.placeholder}
                            </div>
                        </div>
                        <div id="job-board-in-progress" className="job-board-in-progress section">
                            <p className="in-progress-title">In Progress</p>
                            <div className="job-board-in-progress-tasks" index={1}>
                                {tasks?.filter(task => task.status === "In Progress")?.map((task, index) => {
                                    return <TaskBlock key={task.id} task={task} taskIndex={index} />
                                })}
                                {provided.placeholder}
                            </div>
                        </div>
                        <div id="job-board-complete" className="job-board-complete section">
                            <p className="complete-title">Complete</p>
                            <div className="job-board-todo-tasks" index={2}>
                                {tasks?.filter(task => task.status === "Complete")?.map((task, index) => {
                                    return <TaskBlock key={task.id} task={task} taskIndex={index} />
                                })}
                                {provided.placeholder}
                            </div>
                        </div>
                    </div>
                )}
            </Droppable>
            <AddTaskModal />
        </DragDropContext>
    )
}
