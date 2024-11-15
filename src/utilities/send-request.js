import { getAuth } from "firebase/auth";

export default async function sendRequest(url, method = 'GET', payload = null) {
    const options = { method };
    
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        const idToken = await user.getIdToken();
        options.headers ||= {};
        options.headers.Authorization = `Bearer ${idToken}`;
    }

    const res = await fetch(url, options);

    if (res.ok) return res.json();
    throw new Error('Bad Request');
}
