import { AUTHENTICATE, LOGOUT, INIT_LOGIN_CHECK, INVALID_LOGIN } from './user.types';

const INITIAL_STATE = {
    userInfo: null,
    inValidUserMessage: ''
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_LOGIN_CHECK:
            let obj = null;
            if (localStorage.getItem('vistapath_user')) obj = JSON.parse(localStorage.getItem('vistapath_user'));
            return {
                ...state,
                userInfo: obj
            }

        case AUTHENTICATE: {
            localStorage.setItem('vistapath_user', JSON.stringify(action.payload));
            return {
                ...state,
                userInfo: action.payload
           };
        }
        case INVALID_LOGIN: {
            return {
                ...state,
                inValidUserMessage: action.payload
           };
        }
        case LOGOUT:
        localStorage.removeItem('vistapath_user');
           return {
            ...state,
            userInfo: null
           };
         default: return state;
    }
};

export default reducer;
