import { useState } from 'react'

function Register() {

    const initialFormState = {
        firstName: '',
        lastName: '',
        referredBy: '',
        username: '',
        password: '',
        confirmPassword: '',
    }

    const [formData, setFormData] = useState(initialFormState)

    const handleChange = (e) => {

        const { name, value } = e.target 

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("registration received!")

        setFormData(initialFormState)
    }

    return (
        <div style={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh'
            }}
        >
            <form 
                style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    fontSize: '30px',
                }}
                onSubmit={handleSubmit}
            >
                <h1>Register For an Account:</h1>

                <label
                    htmlFor='username'
                >Username: </label>
                <input 
                    style={{
                        height: '30px', 
                        width: '300px', 
                        backgroundColor: 'white',
                        margin: '10px',
                    }}
                    id='username'
                    name='username'
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                ></input>

                <label
                    htmlFor='username'
                >Username: </label>
                <input 
                    style={{
                        height: '30px', 
                        width: '300px', 
                        backgroundColor: 'white',
                        margin: '10px',
                    }}
                    id='username'
                    name='username'
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                ></input>

                <label
                    htmlFor='username'
                >Username: </label>
                <input 
                    style={{
                        height: '30px', 
                        width: '300px', 
                        backgroundColor: 'white',
                        margin: '10px',
                    }}
                    id='username'
                    name='username'
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                ></input>

                <label
                    htmlFor='username'
                >Username: </label>
                <input 
                    style={{
                        height: '30px', 
                        width: '300px', 
                        backgroundColor: 'white',
                        margin: '10px',
                    }}
                    id='username'
                    name='username'
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                ></input>

                <label
                    htmlFor='password'
                >Password: </label>
                <input 
                    style={{
                        height: '30px', 
                        width: '300px', 
                        backgroundColor: 'white',
                        margin: '10px',
                    }}
                    id='password'
                    name='password'
                    type='password'
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                ></input>

                <label
                    htmlFor='confirmPassword'
                >Confirm Password: </label>
                <input 
                    style={{
                        height: '30px', 
                        width: '300px', 
                        backgroundColor: 'white',
                        margin: '10px',
                    }}
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                ></input>

                <button 
                    style={{
                        backgroundColor: 'gray',
                        margin: '10px',
                    }}
                    type='submit'
                >Submit</button>
            </form>
        </div>
    )
}

export default Register