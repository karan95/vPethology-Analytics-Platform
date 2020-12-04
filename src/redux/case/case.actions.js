import {
    SET_ALL_CASES,
    NEW_CASE_CREATED,
    CASE_EDIT_INITIATED,
    CASE_EDIT_DISCARDED,
    SET_ALL_PENDING_CASES,
    CLEAR_CASE_UPDATE_NOTIFICATION
} from './case.types';
import * as CASE_API from '../../api/cases';


export const getAllCases = (uid) => {
    return function (dispatch) {

        // api req
        return CASE_API.getAllCaseAnalysis(uid)
            .then((response) => response.json())
            .then((data) => {
                dispatch(setAllCases(data));
            })
            .catch(() => {
                // error handling
            });
    };
};

export const getAllCasesByFilter = (uid, status) => {
    return function (dispatch) {
        // api req
        return CASE_API.getAllCaseAnalysisByFilter(uid, status)
            .then((response) => response.json())
            .then((data) => {
                dispatch(setAllCases(data));
            })
            .catch(() => {
                // error handling
            });
    };
};

export const setAllCases = (payload) => {
    return {
        type: SET_ALL_CASES,
        payload
    };
}

export const createNewCase = (payload) => {
    const { userId, data } = payload;
    return function (dispatch) {
        return CASE_API.creatNewCaseAnalysis(userId, data)
            .then((response) => response.json())
            .then((data) => {
                dispatch(newCaseCreated('New case created successfully...'));
            })
            .catch(() => {
                // error handling
            });
    };
}

export const editCase = (payload) => {
    const { userId, caseId, data } = payload;
    return function (dispatch) {
        return CASE_API.editCaseAnalysis(userId, caseId, data)
            .then((response) => response.json())
            .then((data) => {
                dispatch(newCaseCreated('Case edited successfully...'));
            })
            .catch(() => {
                // error handling
            });
    };
}

export const newCaseCreated = (payload) => {
    return {
        type: NEW_CASE_CREATED,
        payload
    };
}

export const clearCaseUpdateNotification = () => {
    return {
        type: CLEAR_CASE_UPDATE_NOTIFICATION
    };
}


export const editSelectedCase = (payload) => {
    return {
        type: CASE_EDIT_INITIATED,
        payload
    };
}

export const caseEditDiscarded = () => {
    return {
        type: CASE_EDIT_DISCARDED
    };
}

// Admin APIs
export const getAllCasesForAdmin = (uid) => {
    return function (dispatch) {

        // api req
        return CASE_API.getAllCasesForAdmin(uid)
            .then((response) => response.json())
            .then((data) => {
                dispatch(setAllCases(data));
            })
            .catch(() => {
                // error handling
            });
    };
};


export const getAllPendingCases = (uid) => {
    return function (dispatch) {
        // api req
        return CASE_API.getAllPendingCaseAnalysis(uid)
            .then((response) => response.json())
            .then((data) => {
                dispatch(setAllPendingCases(data));
            })
            .catch(() => {
                // error handling
            });
    };
};

export const setAllPendingCases = (payload) => {
    return {
        type: SET_ALL_PENDING_CASES,
        payload
    };
}

export const changePendingCaseStatus = (uid, caseId, status) => {
    return function (dispatch) {
        // api req
        return CASE_API.changeCaseStatus(uid, caseId, status)
            .then((response) => response.json())
            .then((data) => {
                dispatch(getAllPendingCases(uid));
            })
            .catch(() => {
                // error handling
            });
    };
};

export const changeAllPendingCaseStatus = (uid, status) => {
    return function (dispatch) {
        // api req
        return CASE_API.changeAllCaseStatus(uid, status)
            .then((response) => response.json())
            .then((data) => {debugger;
                dispatch(getAllPendingCases(uid));
            })
            .catch(() => {
                // error handling
            });
    };
};
