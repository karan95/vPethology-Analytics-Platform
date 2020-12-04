import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import caseReducer from './case/case.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    caseAnalysisConsole: caseReducer
});

export default rootReducer;