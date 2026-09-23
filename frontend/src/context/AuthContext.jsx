import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Check localStorage on mount to persist login
    useEffect(() => {
        const storedUser = localStorage.getItem('exitwx_user')
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (err) {
                console.error('Failed to parse stored user:', err)
                localStorage.removeItem('exitwx_user')
            }
        }
        setLoading(false)
    }, [])

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem('exitwx_user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('exitwx_user')
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

