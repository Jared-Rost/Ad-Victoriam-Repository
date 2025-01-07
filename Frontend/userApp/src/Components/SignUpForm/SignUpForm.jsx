import React, {useState, useRef} from 'react';
import './SignUpForm.css';
import { Link, useNavigate } from 'react-router-dom';


import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';

const SignUpForm = () => {
    const page = 1;
    const usernameRef = useRef(null); // Ref for username input
    const passwordRef = useRef(null); // Ref for password input
    const emailRef = useRef(null); // Ref for password input
    const roleRef = useRef(null); // Ref for role input
    const navigate = useNavigate(); // Initialize useHistory hook


    const [errorMessage, setErrorMessage] = useState('');

    const SignUpRequest = async () => {       
        try {
            const response = await axios.post('http://127.0.0.1:5000/register', {
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                role: roleRef.current.value
            });

            // Check response status
            if (response.status === 200) {
                // Login successful, handle further actions such as storing token

                // Redirect to home page here
                navigate('/login');
                console.log('SignUp successful');
            } else {
                // Login failed, display error message
                setErrorMessage('SignUp failed');
            }
        } catch (error) {
            // Error occurred during login
            console.error('SignUp error:', error.message);
            setErrorMessage('SignUp error');
        }
    }
    
    return (
        <div className='wrapper'>
            <form action="" onSubmit={() => SignUpRequest()}>
                <h1>Sign Up</h1>
                <div className="input-box">
                    <input type="text" placeholder='Email' ref={emailRef} required />
                </div>
                <div className="input-box">
                    <input type="text" placeholder='Username' ref={usernameRef} required />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' ref={passwordRef} required />
                </div>
                <select className="select-role" ref={roleRef}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Submit</button>
                <div className="back">
                 <p><Link to="/login">Return to login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;