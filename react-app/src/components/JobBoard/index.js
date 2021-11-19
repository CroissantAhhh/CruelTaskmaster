import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { JobPageContext, useJobPage } from '../../context/JobPageContext';
import { updateTask } from '../../store/tasks';

import TaskBlock from "./TaskBlock";
import AddTaskModal from "./AddTaskModal";
import "./JobBoard.css";

export default function JobBoard({ tasks }) {
    const { jobHash } = useParams();

    const { jobPageInfo, setJobPageInfo, populateJobBoard } = useJobPage();

    useEffect(() => {
        console.log('im watching you')
        populateJobBoard(tasks);
    }, [jobHash])

    function handleOnDragEnd(result) {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        };

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = jobPageInfo.sections[source.droppableId];
        const finish = jobPageInfo.sections[destination.droppableId];

        if (start === finish) {
            console.log("same list!!")
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newSection = {
                ...start,
                taskIds: newTaskIds,
            };

            const newPageInfo = {
                ...jobPageInfo,
                sections: {
                    ...jobPageInfo.sections,
                    [newSection.id]: newSection,
                },
            };
            setJobPageInfo(newPageInfo);
            return;
        }

        console.log("different lists")
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newPageInfo = {
            ...jobPageInfo,
            sections: {
                ...jobPageInfo.sections,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            }
        }
        setJobPageInfo(newPageInfo);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="job-board">
                <div id="job-board-todo" className="job-board-todo section">
                    <p className="todo-title">To-do</p>
                    <Droppable droppableId="to-do-section">
                        {provided => (
                            <div className="to-do-section"  {...provided.droppableProps} ref={provided.innerRef}>
                                {jobPageInfo.sections['to-do-section'].taskIds.map((taskId, index) => {
                                    return <TaskBlock key={jobPageInfo.tasks[taskId].id} task={jobPageInfo.tasks[taskId]} taskIndex={index} />
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                <div id="job-board-in-progress" className="job-board-in-progress section">
                    <p className="in-progress-title">In Progress</p>
                    <Droppable droppableId="in-progress-section">
                        {provided => (
                            <div className="in-progress-section"  {...provided.droppableProps} ref={provided.innerRef}>
                                {jobPageInfo.sections['in-progress-section'].taskIds.map((taskId, index) => {
                                    return <TaskBlock key={jobPageInfo.tasks[taskId].id} task={jobPageInfo.tasks[taskId]} taskIndex={index} />
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                <div id="job-board-complete" className="job-board-complete section">
                    <p className="complete-title">Complete</p>
                    <Droppable droppableId="complete-section">
                        {provided => (
                            <div className="complete-section" {...provided.droppableProps} ref={provided.innerRef}>
                                {jobPageInfo.sections['complete-section'].taskIds.map((taskId, index) => {
                                    return <TaskBlock key={jobPageInfo.tasks[taskId].id} task={jobPageInfo.tasks[taskId]} taskIndex={index} />
                                })}
                                {provided.placeholder}
                            </div>
                        )}

                    </Droppable>
                </div>
            </div>
            <AddTaskModal />
        </DragDropContext>
    )
}
