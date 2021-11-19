import { createContext, useContext, useState, useCallback } from 'react';

export const JobPageContext = createContext();

export const useJobPage = () => useContext(JobPageContext)

export default function JobPageProvider({ children }) {
    const jobSections = {
        'to-do-section': {
            id: 'to-do-section',
            title: 'To-do',
            taskIds: [],
        },
        'in-progress-section': {
            id: 'in-progress-section',
            title: 'In Progress',
            taskIds: [],
        },
        'complete-section': {
            id: 'complete-section',
            title: 'Complete',
            taskIds: [],
        }
    }
    const [jobPageInfo, setJobPageInfo] = useState({ sections: jobSections, tasks: {}})

    const populateJobBoard = useCallback(
        (tasksInput) => {
            const taskObject = {};
            const sectionsObject = {
                'to-do-section': {
                    id: 'to-do-section',
                    title: 'To-do',
                    taskIds: [],
                },
                'in-progress-section': {
                    id: 'in-progress-section',
                    title: 'In Progress',
                    taskIds: [],
                },
                'complete-section': {
                    id: 'complete-section',
                    title: 'Complete',
                    taskIds: [],
                }
            };
            for (let task of tasksInput) {
                if (task.status === "To-do") {
                    sectionsObject['to-do-section'].taskIds.push("task-block-" + task.id);
                } else if (task.status === "In Progress") {
                    sectionsObject['in-progress-section'].taskIds.push("task-block-" + task.id);
                } else if (task.status === "Complete") {
                    sectionsObject['complete-section'].taskIds.push("task-block-" + task.id)
                }
                const newTaskKey = 'task-block-' + task.id;
                const newTask = { id: newTaskKey, title: task.title, status: task.status, details: task.details}
                taskObject[newTaskKey] = newTask;
            };
            setJobPageInfo({ sections: sectionsObject, tasks: taskObject});
        },
        [setJobPageInfo]
    )
    return (
        <JobPageContext.Provider value={{jobPageInfo, setJobPageInfo, populateJobBoard}}>
            {children}
        </JobPageContext.Provider>
    );
}
