import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import TaskBlock from '../TaskBlock'
import AddTaskModal from '../AddTaskModal'
import { updateSection, removeSection } from '../../../store/sections';

export default function JobBoardSection({ section, tasks, index }) {
    const dispatch = useDispatch();
    const { jobHash } = useParams();
    const userJobs = useSelector(state => Object.values(state.jobs));
    const currentJob = userJobs?.find(job => job.hashedId === jobHash);
    const [sectionTitle, setSectionTitle] = useState(section.title);
    const [sectionEDStyle, setSectionEDStyle] = useState({
        display: "none",
        position: "fixed",
        zIndex: 2,
        padding: "30px",
        borderRadius: "30px",
        border: "1px solid black",
        backgroundColor: "white",
    });

    const taskAreaStyle = {
        height: '500px'
    }

    function showSectionED(e) {
        e.stopPropagation();
        if (e.currentTarget.className === 'show-section-ED') {
            const sectionRect = e.currentTarget.getBoundingClientRect();
            setSectionEDStyle({
                ...sectionEDStyle,
                left: `${sectionRect.left}px`,
                top: `${sectionRect.top}px`,
                display: 'inline-block'
            })
        } else {

        }
    }

    function closeSectionED(e) {
        e.stopPropagation();
        setSectionTitle(section.title);
        setSectionEDStyle({
            ...sectionEDStyle,
            top: "",
            left: "",
            display: "none",
        })
    }

    async function editSectionDetails(e) {
        e.preventDefault();

        if (sectionTitle) {
            dispatch(updateSection({
                id: section.id,
                title: sectionTitle,
            }));
        }
        return;
    }

    async function deleteSection(e) {
        dispatch(removeSection(section.id))
    }

    const editDeleteSection = (
        <div className="edit-delete-section-container" style={sectionEDStyle}>
            <button className="close-section-ED" onClick={e => closeSectionED(e)}>x</button>
            <p className="edit-section-title">Edit Section Title</p>
            <form className="edit-section-title-form" onSubmit={editSectionDetails}>
                <input type="text" value={sectionTitle} onChange={e => setSectionTitle(e.target.value)}></input>
            </form>
            <button className="delete-section-button" onClick={deleteSection}>Delete Section</button>
        </div>
    )

    return (
        <Draggable draggableId={section.id} index={index}>
            {provided => (
                <div className="job-board-section" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className="job-board-section-top">
                        <p>{section.title}</p>
                        {editDeleteSection}
                        <AddTaskModal section={section} />
                        <button className="show-section-ED" onClick={e => showSectionED(e)}>...</button>
                    </div>
                    <Droppable droppableId={section.id} type="task">
                        {provided => (
                            <div className={section.id + '-task-area'} style={taskAreaStyle} {...provided.droppableProps} ref={provided.innerRef}>
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
