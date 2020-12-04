const SERVER_URL = 'https://caseanalysisserver.karanthakor.repl.co';

// User APIs
export const authenticateUser = (data) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return fetch(`${SERVER_URL}/users/auth`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
    }

export const createNewUser = (data) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return fetch(`${SERVER_URL}/users`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
}