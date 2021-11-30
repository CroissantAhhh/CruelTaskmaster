import { createContext, useContext, useState, useCallback } from 'react';

export const JobPageContext = createContext();

export const useJobPage = () => useContext(JobPageContext)

export default function JobPageProvider({ children }) {

    const [jobPageInfo, setJobPageInfo] = useState({ job: {}, sections: {}, tasks: {}, sectionOrder: [] })

    const populateJobBoard = useCallback(
        (jobInput, sectionsInput, tasksInput) => {
            const taskObject = {};
            const sectionsObject = {};

            for (let section of sectionsInput) {
                const newSectionKey = 'section-block-' + section.id;
                const newSection = { id: newSectionKey, title: section.title, taskIds: section.taskOrder.map(taskId => 'task-block-' + taskId)}
                sectionsObject[newSectionKey] = newSection;
            }

            for (let task of tasksInput) {
                const newTaskKey = 'task-block-' + task.id;
                const newTask = { id: newTaskKey, title: task.title, status: task.status, details: task.details, sectionId: 'section-block-' + task.sectionId}
                taskObject[newTaskKey] = newTask;
            };
            const sectionOrderArray = jobInput.sectionOrder.map(sectionId => 'section-block-' + sectionId);
            setJobPageInfo({ job: jobInput, sections: sectionsObject, tasks: taskObject, sectionOrder: sectionOrderArray });
        },
        [setJobPageInfo]
    )

    const addTaskToBoard = useCallback(
        (task) => {
            const newTaskKey = 'task-block-' + task.id;
            const parentSectionId = 'section-block-' + task.sectionId;
            const newTask = { id: newTaskKey, title: task.title, status: task.status, details: task.details, sectionId: parentSectionId };
            const updatedSections = {...jobPageInfo.sections}
            updatedSections[parentSectionId].taskIds.push(newTaskKey);
            setJobPageInfo({...jobPageInfo, sections: updatedSections, tasks: {...jobPageInfo.tasks, [newTaskKey]: newTask}})
        }
    )

    const addSectionToBoard = useCallback(
        (section) => {
            const newSectionKey = 'section-block-' + section.id;
            const newSection = { id: newSectionKey, title: section.title, taskIds: [] };
            const newSectionOrder = jobPageInfo.sectionOrder;
            newSectionOrder.push(newSectionKey);
            setJobPageInfo({ ...jobPageInfo, sections: { ...jobPageInfo.sections, [newSectionKey]: newSection }, sectionOrder: newSectionOrder})
        }
    )
    return (
        <JobPageContext.Provider value={{jobPageInfo, setJobPageInfo, populateJobBoard, addTaskToBoard, addSectionToBoard}}>
            {children}
        </JobPageContext.Provider>
    );
}
