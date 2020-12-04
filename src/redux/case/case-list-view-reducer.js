import { SET_ALL_CASES } from './case.types';

const INITIAL_STATE = {
    caseList: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ALL_CASES: {
            return {
                ...state,
                caseList: action.payload
           };
        }
        default: return state;
    }
};

export default reducer;
