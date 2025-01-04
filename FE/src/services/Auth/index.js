import { apiUrl } from "../../config/Api";
import Cookies from 'js-cookie';

// services/googleAuth.js
export const googleLogin = async (idToken, callback) => {
    console.log('Sending Google login request with ID token:', idToken);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${apiUrl}/auth/google-login`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true; // Important for sending cookies

    xhr.onload = async function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Received response:', xhr.responseText);
            try {
                const result = JSON.parse(xhr.responseText);
                const { token, user } = result;

                // Lưu cookie token và role
                Cookies.set('token', token, { path: '/', expires: 1 / 48 });
                Cookies.set('role', user.role, { path: '/', expires: 1 / 48 });

                // Đảm bảo rằng token và role đã được lưu trước khi thực hiện tiếp
                await new Promise(resolve => setTimeout(resolve, 100));

                // Truyền token và user vào callback
                callback(null, { token, user });
            } catch (error) {
                console.error('Error parsing response:', error);
                callback('Login failed!');
            }
        } else {
            console.error('Login Error:', xhr.responseText);
            callback('Login failed!');
        }
    };

    xhr.onerror = function () {
        console.error('Network Error:', xhr.statusText);
        callback('Network error!');
    };

    xhr.send(JSON.stringify({ id_token: idToken }));
};






export const login = (username, password, callback) => {
    console.log('Sending login request with:', { username, password });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${apiUrl}/login`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    console.log('Received response:', response);

                    const { token, user } = response;

                    callback(null, { token, user });
                } catch (e) {
                    callback('An error occurred while processing data!', null);
                }
            } else {
                console.log('Login error:', xhr.responseText);
                callback('Incorrect username or password!', null);
            }
        }
    };

    xhr.onerror = () => {
        callback('Network connection error! Check your Internet connection or network configuration!', null);
    };

    xhr.send(JSON.stringify({ username, password }));
};

export const clientLogin = (username, password, callback) => {
    console.log('Sending client login request with:', { username, password });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${apiUrl}/login`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    console.log('Received response:', response);

                    const { token, user } = response;
                    callback(null, { token, user });
                } catch (e) {
                    callback('An error occurred while processing data!', null);
                }
            } else {
                console.log('Client login error:', xhr.responseText);
                callback('Incorrect username or password!', null);
            }
        }
    };

    xhr.onerror = () => {
        callback('Network connection error! Check your Internet connection or network configuration!', null);
    };

    xhr.send(JSON.stringify({ username, password }));
};

export const getUserProfile = (token) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/profile`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.withCredentials = true;

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } catch (error) {
                        reject(new Error('Error parsing JSON response'));
                    }
                } else {
                    reject(new Error(`Request failed with status ${xhr.status}`));
                }
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network error'));
        };

        xhr.send();
    });
};

export const getUserGoogleProfile = (token) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/auth/profile`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.withCredentials = true;

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } catch (error) {
                        reject(new Error('Error parsing JSON response'));
                    }
                } else {
                    reject(new Error(`Request failed with status ${xhr.status}`));
                }
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network error'));
        };

        xhr.send();
    });
};


export const logout = () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiUrl}/logout`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.withCredentials = true; // Đảm bảo cookie được gửi đi

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Logged out successfully');
                    resolve();
                } else {
                    console.error('Failed to log out:', xhr.responseText);
                    reject(new Error('Failed to log out'));
                }
            }
        };

        xhr.onerror = () => {
            console.error('Network error');
            reject(new Error('Network error'));
        };

        xhr.send();
    });
};


export const updateProfile = async (id, userData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${apiUrl}/profile/${id}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(new Error('Failed to update user'));
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network Error'));
        };

        xhr.send(JSON.stringify(userData));
    });
};

export const changePassword = (oldPassword, newPassword) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiUrl}/change-password`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.withCredentials = true;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(JSON.parse(xhr.responseText).message || 'An error occurred while changing password!'));
                }
            }
        };

        xhr.send(JSON.stringify({ oldPassword, newPassword }));
    });
};


