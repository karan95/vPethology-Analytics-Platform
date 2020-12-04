import { 
    NEW_CASE_CREATED,
    CASE_EDIT_INITIATED,
    CASE_EDIT_DISCARDED,
    CLEAR_CASE_UPDATE_NOTIFICATION
} from './case.types';

const INITIAL_STATE = {
    caseEditInProgressId: '',
    caseCreatedNotification: '',
    status: ''
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEW_CASE_CREATED: {
            return {
                ...state,
                status: action.payload
           };
        }
        case CASE_EDIT_INITIATED: {
            return {
                ...state,
                caseEditInProgressId: action.payload
           };
        }
        case CASE_EDIT_DISCARDED: {
            return {
                ...state,
                caseEditInProgressId: ''
           };
        }
        case CLEAR_CASE_UPDATE_NOTIFICATION: {
            return {
                ...state,
                status: action.payload
           };
        }
        default: return state;
    }
};

export default reducer;
