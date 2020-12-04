const SERVER_URL = 'https://caseanalysisserver.karanthakor.repl.co';

// User Api
export const getAllCaseAnalysis = (uid) => {
    return fetch(`${SERVER_URL}/patient-analysis/all/${uid}`);
}

export const getAllCaseAnalysisByFilter = (uid, status) => {
    return fetch(`${SERVER_URL}/patient-analysis/filter/${uid}?statusId=${status.statusId}`);
}
export const getCaseAnalysis = (uid, caseid) => {
    return fetch(`${SERVER_URL}/patient-analysis/${uid}/${caseid}`);
}

export const creatNewCaseAnalysis = (uid, data) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return fetch(`${SERVER_URL}/patient-analysis/${uid}/submit`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
}

export const editCaseAnalysis = (uid, caseid, data) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return fetch(`${SERVER_URL}/patient-analysis/${uid}/${caseid}`,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        });
}

// Admin APIs
export const getAllCasesForAdmin = (uid) => {
    return fetch(`${SERVER_URL}/patient-analysis/admin/all/${uid}`);
}

export const getAllPendingCaseAnalysis = (uid) => {
    return fetch(`${SERVER_URL}/admin/patient-analysis/${uid}`);
}

export const changeCaseStatus = (uid, caseid, status) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return fetch(`${SERVER_URL}/admin/patient-analysis/${uid}/${caseid}/status`,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify(status)
        });
}

// force update for pending cases
export const changeAllCaseStatus = (uid, status) => {debugger;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return fetch(`${SERVER_URL}/admin/all/patient-analysis/${uid}/status`,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify(status)
        });
}