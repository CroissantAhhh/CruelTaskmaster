// import { csrfFetch } from "./csrf";

const LOAD = 'sections/LOAD';
const ADD = 'sections/ADD';
const REMOVE = 'sections/REMOVE'

const load = list => ({
    type: LOAD,
    list,
});

const add = (section) => ({
    type: ADD,
    section
});

const remove = (sectionId) => ({
    type: REMOVE,
    sectionId
});

export const loadJobSections = (jobHash) => async dispatch => {
    const response = await fetch(`/api/sections/byJob/${jobHash}`);

    if (response.ok) {
        const sections = await response.json();
        dispatch(load(sections.sections));
    };
};

export const addSection = (formData) => async dispatch => {
    const response  = await fetch("/api/sections/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const section = await response.json();
        dispatch(add(section));
        return section;
    }
};

export const updateSection = (formData) => async dispatch => {
    const response = await fetch(`/api/sections/${formData.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const section = await response.json();
        dispatch(add(section));
        return section;
    }
}

export const removeSection = (sectionId) => async dispatch => {
    const response = await fetch(`/api/sections/${sectionId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const sectionId = await response.json();
        dispatch(remove(sectionId))
    }
}

const sectionReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            for (let item of action.list) {
                newState[item.id] = item;
            };
            return newState;
        case ADD:
            return {...state, [action.section.id]: action.section}
        case REMOVE:
            const newsections = {...state};
            delete newsections[action.sectionId];
            return newsections;
        default:
            return state;
    }
};

export default sectionReducer;
