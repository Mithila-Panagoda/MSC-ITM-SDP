export const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:8000/api/users/login/', {
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
    console.log("access token: " + access);
    // Save tokens to localStorage
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);

    // Set a timeout to log out the user after an hour
    setTimeout(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Optionally, redirect to login page or show a message
        window.location.href = '/login';
    }, 3600000); // 1 hour in milliseconds

    return data;
};

export const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
};