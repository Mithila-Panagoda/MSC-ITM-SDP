const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("BASE_URL: " + BASE_URL);
const LOGIN_URL = `${BASE_URL}/api/users/login/`;
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const login = async (email: string, password: string) => {
    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    const { access, refresh } = data;
    // Save tokens to localStorage
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);

    // Set a timeout to log out the user after an hour
    setTimeout(() => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        // Optionally, redirect to login page or show a message
        window.location.href = '/login';
    }, 3600000); // 1 hour in milliseconds

    return data;
};

export const isAuthenticated = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    return !!accessToken;
};