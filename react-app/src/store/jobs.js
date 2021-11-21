// import { csrfFetch } from "./csrf";

const LOAD = 'jobs/LOAD';
const ADD = 'jobs/ADD';
const REMOVE = 'jobs/REMOVE'

const load = list => ({
    type: LOAD,
    list,
});

const add = (job) => ({
    type: ADD,
    job
});

const remove = (jobId) => ({
    type: REMOVE,
    jobId
});

export const loadEnvironmentJobs = (environmentId) => async dispatch => {
    const response = await fetch(`/api/jobs/byEnvironment/${environmentId}`);

    if (response.ok) {
        const jobs = await response.json();
        dispatch(load(jobs.jobs));
    };
};

export const loadSingleJob = (jobHash) => async dispatch => {
    const response = await fetch(`/api/jobs/${jobHash}`);

    if (response.ok) {
        const job = await response.json();
        dispatch(add(job));
    }
}

export const addJob = (formData) => async dispatch => {
    const response  = await fetch("/api/jobs/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const job = await response.json();
        dispatch(add(job));
        return job;
    }
};

export const updateJob = (formData) => async dispatch => {
    const response = await fetch(`/api/jobs/${formData.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const job = await response.json();
        dispatch(add(job));
        return job;
    }
}

export const removeJob = (jobId) => async dispatch => {
    const response = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const jobId = await response.json();
        dispatch(remove(jobId))
    }
}

const jobReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            for (let item of action.list) {
                newState[item.id] = item;
            };
            return newState;
        case ADD:
            return {...state, [action.job.id]: action.job}
        case REMOVE:
            const newjobs = {...state};
            delete newjobs[action.jobId];
            return newjobs;
        default:
            return state;
    }
};

export default jobReducer;
