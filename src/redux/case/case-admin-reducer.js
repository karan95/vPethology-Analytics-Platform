import { SET_ALL_PENDING_CASES } from './case.types';

const INITIAL_STATE = {
    casePendingList: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ALL_PENDING_CASES: {
            return {
                ...state,
                casePendingList: action.payload
           };
        }
        default: return state;
    }
};

export default reducer;
