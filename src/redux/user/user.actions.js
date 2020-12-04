import { AUTHENTICATE, LOGOUT, INIT_LOGIN_CHECK } from './user.types';
import * as USER_API from '../../api/user';


export const userAuthenticated = (payload) => {
    return {
        type: AUTHENTICATE,
        payload
    };
};

// export const userCreated = (payload) => {};

export const createUserAccount = (data) => {
    return function (dispatch) {
        // api req
        return USER_API.createNewUser(data)
            .then((response) => response.json())
            .then((data) => {
                // dispatch(userCreated());
            })
            .catch(() => {
                // error handling
            });
    };
};

export const authenticateUser = (data) => {
    return function (dispatch) {
        // api req
        return USER_API.authenticateUser(data)
            .then((response) => response.json())
            .then((data) => {
                dispatch(userAuthenticated(data));
            })
            .catch(() => {
                // error handling
            });
    };
};

export const isUserLoggedIn = () => {
    return {
        type: INIT_LOGIN_CHECK
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT
    };
};
