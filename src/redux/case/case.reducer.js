import { combineReducers } from 'redux';
import caseListViewReducer from './case-list-view-reducer';
import caseWizardReducer from './case-wizard-reducer';
import caseAdminReducer from './case-admin-reducer';

const caseReducer = combineReducers({
    caseWizard: caseWizardReducer,
    caseListView: caseListViewReducer,
    admin: caseAdminReducer
});

export default caseReducer;