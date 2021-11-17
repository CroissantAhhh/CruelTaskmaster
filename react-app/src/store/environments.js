// import { csrfFetch } from "./csrf";

const LOAD = 'environments/LOAD';
const ADD = 'environments/ADD';
const REMOVE = 'environments/REMOVE'

const load = list => ({
    type: LOAD,
    list,
});

const add = (environment) => ({
    type: ADD,
    environment
});

const remove = (environmentId) => ({
    type: REMOVE,
    environmentId
});

export const loadUserEnvironments = (userId) => async dispatch => {
    const response = await fetch(`/api/environments/byUser/${userId}`);

    if (response.ok) {
        const environments = await response.json();
        dispatch(load(environments.environments));
    };
};

export const addEnvironment = (formData) => async dispatch => {
    const response  = await fetch("/api/environments", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const environment = await response.json();
        dispatch(add(environment));
        return environment;
    }
};

export const updateEnvironment = (formData) => async dispatch => {
    const response = await fetch(`/api/environments/${formData.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const environment = await response.json();
        dispatch(add(environment));
    }
}

export const removeenvironment = (environmentId) => async dispatch => {
    const response = await fetch(`/api/environments/${environmentId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const environment = await response.json();
        dispatch(remove(environmentId))
    }
}

const environmentReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            for (let item of action.list) {
                newState[item.id] = item;
            };
            return newState;
        case ADD:
            return {...state, [action.environment.id]: action.environment}
        case REMOVE:
            const newenvironments = {...state};
            delete newenvironments[action.environmentId];
            return newenvironments;
        default:
            return state;
    }
};

export default environmentReducer;
