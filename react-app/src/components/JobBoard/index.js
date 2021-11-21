import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useJobPage } from '../../context/JobPageContext';
import { updateJob } from '../../store/jobs';
import { updateSection } from '../../store/sections';
import { swapTasks, updateTask } from '../../store/tasks';

import JobBoardSection from "../JobBoard/JobBoardSection";
import AddSectionModal from './AddSectionModal';
import "./JobBoard.css";

export default function JobBoard({ sections }) {
    const dispatch = useDispatch();
    const { jobHash } = useParams();

    const { jobPageInfo, setJobPageInfo, populateJobBoard } = useJobPage();

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/jobs/full/${jobHash}`);

            if (response.ok) {
                const jobFullInfo = await response.json();
                const { job, sections, tasks } =  jobFullInfo;
                populateJobBoard(job, sections, tasks)
            }
        })()
    }, [jobHash])

    function swapWithinSection(newTaskIds, sectionElementId) {
        const sectionId = sectionElementId.split("-")[2];
        const newTaskOrder = {
            id: sectionId,
            taskOrder: newTaskIds.map(newTaskId => newTaskId.split("-")[2]).join("<>"),
        };
        dispatch(updateSection(newTaskOrder));
    }

    async function swapBetweenSection(startNewOrder, finishNewOrder, startId, finishId) {
        const section1Id = finishId.split("-")[2];
        const newTask1Order = {
            id: section1Id,
            taskOrder: finishNewOrder.map(taskId => taskId.split("-")[2]).join("<>"),
        }
        await dispatch(updateSection(newTask1Order));
        const section2Id = startId.split("-")[2];
        const newTask2Order = {
            id: section2Id,
            taskOrder: startNewOrder.map(taskId => taskId.split("-")[2]).join("<>"),
        }
        await dispatch(updateSection(newTask2Order));
    }

    function swapSection(newSectionIds) {
        const jobId = jobPageInfo.job.id;
        const newSectionOrder = {
            id: jobId,
            sectionOrder: newSectionIds.map(sectionId => sectionId.split("-")[2]).join("<>"),
        }
        dispatch(updateJob(newSectionOrder));
    }

    function handleOnDragEnd(result) {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        };

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (type === 'section') {
            const newSectionOrder = Array.from(jobPageInfo.sectionOrder);
            newSectionOrder.splice(source.index, 1);
            newSectionOrder.splice(destination.index, 0, draggableId);

            const newPageInfo = {
              ...jobPageInfo,
              sectionOrder: newSectionOrder,
            };
            setJobPageInfo(newPageInfo);
            swapSection(newSectionOrder);
            return;
        }

        const start = jobPageInfo.sections[source.droppableId];
        const finish = jobPageInfo.sections[destination.droppableId];

        if (start === finish) {
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
            swapWithinSection(newTaskIds, newSection.id);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        const task1Id = startTaskIds.splice(source.index, 1)[0];

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

        const updatedTasks = {
            ...jobPageInfo.tasks,
            [task1Id]: {
                ...jobPageInfo.tasks[task1Id],
                status: newFinish.title
            }
        }

        const newPageInfo = {
            ...jobPageInfo,
            tasks: updatedTasks,
            sections: {
                ...jobPageInfo.sections,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            }
        }
        setJobPageInfo(newPageInfo);
        swapBetweenSection(startTaskIds, finishTaskIds, newStart.id, newFinish.id);
    };

    const jobBoardStyle = {
        width: 500 * jobPageInfo.sectionOrder.length,
    }

    console.log(jobPageInfo)
    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="all-job-sections" direction="horizontal" type="section">
                {provided => (
                    <div className="job-board-container" {...provided.droppableProps} ref={provided.innerRef} style={jobBoardStyle}>
                        {jobPageInfo.sectionOrder.map((sectionId, index) => {
                            const section = jobPageInfo.sections[sectionId];
                            const sectionTasks = section.taskIds.map(taskId => jobPageInfo.tasks[taskId]);
                            return <JobBoardSection key={sectionId} section={section} tasks={sectionTasks} index={index}/>
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <AddSectionModal />
        </DragDropContext>
    )
}
