import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TaskBlock from '../TaskBlock'
import AddTaskModal from '../AddTaskModal'
import { useJobPage } from '../../../context/JobPageContext';
import DeleteConfirmationModal from '../../DeleteConfirmationModal';
import { updateSection, removeSection } from '../../../store/sections';
import "./JobBoardSection.css";

export default function JobBoardSection({ section, tasks, index }) {
    const dispatch = useDispatch();
    const { jobHash } = useParams();
    const { jobPageInfo, setJobPageInfo } = useJobPage();
    const userJobs = useSelector(state => Object.values(state.jobs));
    const currentJob = userJobs?.find(job => job.hashedId === jobHash);
    const [sectionTitle, setSectionTitle] = useState(section.title);
    const [sectionEDStyle, setSectionEDStyle] = useState({
        display: "none",
        position: "fixed",
        zIndex: "10",
    });

    useEffect(() => {
        return () => {
            tasks = tasks.filter(task => (task));
        }
    }, [tasks]);

    const taskAreaStyle = {
        height: '100%'
    }

    function showSectionED(e) {
        e.stopPropagation();
        if (e.currentTarget.className === 'show-section-ED') {
            const sectionRect = e.currentTarget.getBoundingClientRect();
            setSectionEDStyle({
                ...sectionEDStyle,
                left: `${sectionRect.left - 50}px`,
                top: `${sectionRect.top + 60}px`,
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

    async function editSectionTitle(e) {
        e.preventDefault();

        if (sectionTitle) {
            dispatch(updateSection({
                id: section.id.split("-")[2],
                title: sectionTitle,
            }));
        }
        const updatedSections = {...jobPageInfo.sections};
        updatedSections[section.id].title = sectionTitle;
        const updatedTasks = {...jobPageInfo.tasks};
        for (let task of Object.keys(updatedTasks)) {
            if (updatedTasks[task].sectionId === section.id) {
                updatedTasks[task].status = sectionTitle;
            }
        }
        setJobPageInfo({
            ...jobPageInfo,
            sections: updatedSections,
            tasks: updatedTasks,
        });
        closeSectionED(e);
        return;
    }

    async function deleteSection(e) {
        await dispatch(removeSection(section.id.split("-")[2]));
        const updatedSectionOrder = [...jobPageInfo.sectionOrder]
        updatedSectionOrder.splice(updatedSectionOrder.indexOf(section.id), 1);
        const updatedSections = {...jobPageInfo.sections};
        delete updatedSections[section.id];
        const updatedTasks = {...jobPageInfo.tasks};
        for (let task of Object.keys(updatedTasks)) {
            if (updatedTasks[task].sectionId === section.id) {
                delete updatedTasks[task];
            }
        }
        setJobPageInfo({
            ...jobPageInfo,
            sectionOrder: updatedSectionOrder,
            sections: updatedSections,
            tasks: updatedTasks,
        });
        closeSectionED(e);
        return;
    }

    const editDeleteSection = (
        <div className="edit-delete-section-container" style={sectionEDStyle}>
            <div className="triangle-pointer"></div>
            <div className="EDS-content">
                <button className="close-section-ED" onClick={e => closeSectionED(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="edit-section-title-area">
                    <p className="edit-section-title">Edit Section Title</p>
                    <form className="edit-section-title-form" onSubmit={editSectionTitle}>
                        <input type="text" value={sectionTitle} onChange={e => setSectionTitle(e.target.value)}></input>
                    </form>
                </div>
                {/* <DeleteConfirmationModal deleteRequest={deleteSection} resource={section} resourceName={section.title} /> */}
            </div>
        </div>
    )

    console.log(tasks)

    return (
        <Draggable draggableId={section.id} index={index}>
            {provided => (
                <div className="job-board-section" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className="job-board-section-top">
                        <p>{section.title}</p>
                        {editDeleteSection}
                        <div className="JBS-controls">
                            <AddTaskModal section={section} />
                            <div className="show-section-ED" onClick={e => showSectionED(e)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" width="40px" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <Droppable droppableId={section.id} type="task">
                        {provided => (
                            <div className={section.id + '-task-area'} style={taskAreaStyle} {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks
                                    ? tasks.map((task, index) => {
                                        if (task) {
                                            return <TaskBlock key={task.id} task={task} index={index} />
                                        }
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
