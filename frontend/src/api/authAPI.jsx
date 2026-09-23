const getAPIUrl = () => {
    return window.location.hostname === 'localhost'
        ? 'http://localhost:8000'
        : import.meta.env.VITE_API_URL
}

export const registerUser = async (userData) => {
    const API_URL = getAPIUrl()
    const url = `${API_URL}/api/auth/register`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Registration failed')
        }

        return data
    } catch (error) {
        console.error('Registration error:', error)
        throw error
    }
}

export const loginUser = async (credentials) => {
    const API_URL = getAPIUrl()
    const url = `${API_URL}/api/auth/login`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Login failed')
        }

        return data
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}

