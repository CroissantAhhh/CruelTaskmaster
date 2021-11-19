// import { csrfFetch } from "./csrf";

const LOAD = 'tasks/LOAD';
const ADD = 'tasks/ADD';
const REMOVE = 'tasks/REMOVE'

const load = list => ({
    type: LOAD,
    list,
});

const add = (task) => ({
    type: ADD,
    task
});

const remove = (taskId) => ({
    type: REMOVE,
    taskId
});

export const loadSectionTasks = (sectionId) => async dispatch => {
    const response = await fetch(`/api/tasks/bySection/${sectionId}`);

    if (response.ok) {
        const tasks = await response.json();
        dispatch(load(tasks.tasks));
    };
};

export const addTask = (formData) => async dispatch => {
    const response  = await fetch("/api/tasks/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const task = await response.json();
        dispatch(add(task));
        return task;
    }
};

export const updateTask = (formData) => async dispatch => {
    const response = await fetch(`/api/tasks/${formData.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const task = await response.json();
        dispatch(add(task));
    }
}

export const removetask = (taskId) => async dispatch => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const taskId = await response.json();
        dispatch(remove(taskId))
    }
}

const taskReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            for (let item of action.list) {
                newState[item.id] = item;
            };
            return newState;
        case ADD:
            return {...state, [action.task.id]: action.task}
        case REMOVE:
            const newtasks = {...state};
            delete newtasks[action.taskId];
            return newtasks;
        default:
            return state;
    }
};

export default taskReducer;
