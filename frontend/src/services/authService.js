const API_URL = 'https://interview-platform-5db3.onrender.com/api';

const getHeaders = (includeAuth = false) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (includeAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};

const fetchWithRetry = async (url, options, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            return response;
        } catch (error) {
            if (i === retries - 1) {
                console.error(`Request failed after ${retries} attempts:`, error);
                throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
};

export const register = async (userData) => {
    try {
        const response = await fetchWithRetry(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData),
            credentials: 'include'
        });

        const data = await response.json();

        if (!data.token || !data.user) {
            throw new Error('Invalid response from server');
        }

        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw new Error(error.message || 'Failed to register. Please try again.');
    }
};

export const login = async (credentials) => {
    try {
        const response = await fetchWithRetry(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(credentials),
            credentials: 'include'
        });

        const data = await response.json();

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw new Error(error.message || 'Failed to login. Please check your credentials.');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    return !!getToken();
};


export const authenticatedFetch = async (endpoint, options = {}) => {
    const token = getToken();
    if (!token) {
        throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'API request failed');
    }

    return data;
}; 