import { apiUrl } from "../../config/Api";

export const fetchViews = (setUserData, setError) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/post_views_blogs`, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    setUserData(response.data);
                    resolve(response.data); // Resolve the promise with the data
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    setError('Error parsing JSON');
                    reject(e); // Reject the promise
                }
            } else {
                console.error('HTTP error:', xhr.status);
                setError(`HTTP error! status: ${xhr.status}`);
                reject(new Error(`HTTP error! status: ${xhr.status}`)); // Reject the promise
            }
        };

        xhr.onerror = () => {
            console.error('Network error');
            setError('Network error');
            reject(new Error('Network error')); // Reject the promise
        };

        xhr.send();
    });
};

export const fetchTotalViewsBlog = (setUserData, setError) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/view_total_blog`, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    setUserData(response.data);
                    resolve(response.data);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    setError('Error parsing JSON');
                    reject(e);
                }
            } else {
                console.error('HTTP error:', xhr.status);
                setError(`HTTP error! status: ${xhr.status}`);
                reject(new Error(`HTTP error! status: ${xhr.status}`));
            }
        };

        xhr.onerror = () => {
            console.error('Network error');
            setError('Network error');
            reject(new Error('Network error'));
        };

        xhr.send();
    });
};