import { useState, useContext } from 'react'
import { loginUser } from '../api/authAPI'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'

// Apple dark tokens (same as Contact.jsx)
const T = {
    card:       { background: "#1C1C1E" },
    input:      { background: "#2C2C2E", border: "2px solid #38383A", color: "#FFFFFF", borderRadius: 12, padding: "14px 16px", width: "100%", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" },
    inputFocus: { border: "2px solid #0A84FF" },
    label:      { color: "rgba(235,235,245,0.8)", fontSize: 13, fontWeight: 600, marginBottom: 8, display: "block" },
    textSec:    { color: "rgba(235,235,245,0.7)" },
};

function FormInput({ label, type = "text", name, placeholder, value, onChange, error, onFocus, onBlur, focused }) {
    const style = { 
        ...T.input, 
        ...(focused ? T.inputFocus : {}),
        ...(error ? { border: "2px solid #FF453A" } : {})
    };
    return (
        <div style={{ marginBottom: 16 }}>
            <label style={T.label}>{label}</label>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                style={style} 
            />
            {error && (
                <div style={{ color: "#FF453A", fontSize: 12, marginTop: 6, fontWeight: 500 }}>
                    {error}
                </div>
            )}
        </div>
    );
}

function Login() {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const initialFormState = {
        username: '',
        password: '',
    }

    const [formData, setFormData] = useState(initialFormState)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [focusedField, setFocusedField] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        setLoading(true)

        try {
            const response = await loginUser(formData)
            setSuccess(true)
            login(response.user)
            setFormData(initialFormState)
            
            // Redirect to home after 2 seconds
            setTimeout(() => {
                navigate('/')
            }, 2000)
        } catch (err) {
            setError(err.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(to br, #003366, #0A84FF)', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            {/* Header */}
            <header style={{ background: 'linear-gradient(to right, #003366, #0A84FF)', padding: '16px 20px' }}>
                <div style={{ maxWidth: 448, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    >
                        <Home size={20} />
                    </button>
                    <h1 style={{ color: 'white', fontSize: 18, fontWeight: 600, margin: 0, flex: 1, textAlign: 'center' }}>Login</h1>
                    <div style={{ width: '36px' }}></div>
                </div>
            </header>

            <main style={{ flex: 1, padding: '24px 16px 100px', maxWidth: 448, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                {/* Success banner */}
                {success && (
                    <div style={{ background: 'rgba(48,209,88,0.15)', border: '1.5px solid rgba(48,209,88,0.4)', color: '#30D158', padding: '14px 20px', borderRadius: 14, marginBottom: 16, textAlign: 'center', fontWeight: 600, fontSize: 14 }}>
                        ✓ Login successful! Redirecting...
                    </div>
                )}

                {/* Form card */}
                <div style={{ ...T.card, borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                    <div style={{ padding: 24 }}>
                        <p style={{ ...T.textSec, textAlign: 'center', marginBottom: 24, fontSize: 15, lineHeight: 1.5 }}>
                            Login to access the submission tools and contribute locations.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <FormInput 
                                label="Username" 
                                name="username" 
                                placeholder="johndoe" 
                                value={formData.username} 
                                onChange={handleChange}
                                onFocus={() => setFocusedField('username')}
                                onBlur={() => setFocusedField('')}
                                focused={focusedField === 'username'}
                            />
                            <FormInput 
                                label="Password" 
                                name="password" 
                                type="password"
                                placeholder="••••••••" 
                                value={formData.password} 
                                onChange={handleChange}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField('')}
                                focused={focusedField === 'password'}
                            />

                            {error && (
                                <div style={{ background: 'rgba(255,69,58,0.15)', border: '1.5px solid rgba(255,69,58,0.4)', color: '#FF453A', padding: '14px 20px', borderRadius: 14, marginBottom: 16, textAlign: 'center', fontWeight: 600, fontSize: 14 }}>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%', padding: '14px 0', borderRadius: 12, border: 'none',
                                    background: loading ? 'rgba(10,132,255,0.5)' : 'linear-gradient(to right, #0055AA, #0A84FF)',
                                    color: 'white', fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    boxShadow: '0 4px 16px rgba(10,132,255,0.3)',
                                    opacity: loading ? 0.7 : 1
                                }}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <p style={{ ...T.textSec, textAlign: 'center', marginTop: 20, fontSize: 13 }}>
                            Don't have an account? <a href="/register" style={{ color: '#0A84FF', textDecoration: 'none', fontWeight: 600 }}>Register here</a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login