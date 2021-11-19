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
                const newTask = { id: newTaskKey, title: task.title, status: task.status, details: task.details}
                taskObject[newTaskKey] = newTask;
            };
            const sectionOrderArray = jobInput.sectionOrder.map(sectionId => 'section-block-' + sectionId);
            setJobPageInfo({ job: jobInput, sections: sectionsObject, tasks: taskObject, sectionOrder: sectionOrderArray });
        },
        [setJobPageInfo]
    )
    return (
        <JobPageContext.Provider value={{jobPageInfo, setJobPageInfo, populateJobBoard}}>
            {children}
        </JobPageContext.Provider>
    );
}
