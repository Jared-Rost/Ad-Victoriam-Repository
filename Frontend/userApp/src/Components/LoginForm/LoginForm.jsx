import React, { useState, useRef, useEffect } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Socket from '../Socket/Socket';
import UserDashboard from '../UserDashboard/UserDashboard';

const LoginForm = () => {
    const page = 1;
    const [userInfo, setUserInfo] = useState(null);
    const [hide, setHide] = useState(false)
    const usernameRef = useRef(null); // Ref for username input
    const passwordRef = useRef(null); // Ref for password input
    const navigate = useNavigate(); // Initialize useHistory hook

    const loginRequest = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            }, {
                headers: {
                    //                    'Content-Type': 'application/json' // Use a simple Content-Type header

                    //'Content-Type': 'application/x-www-form-urlencoded' // Use a simple Content-Type header
                }
            });

            console.log(response.data)

            // Check response status
            if (response.status === 200) {
                // Login successful, handle further actions such as storing token
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user_id', response.data.user_id);
                localStorage.setItem('username', response.data.username);

                setUserInfo({
                    ...response.data,
                    lastName: "",
                    page
                })
                
                console.log(userInfo);
                // Redirect to home page here
                console.log('Login successful');
                //navigate('/userDashboard');
            } else {
                // Login failed, display error message
                console.log('Login failed');
                //setErrorMessage('Login failed');
            }
        } catch (error) {
            // Error occurred during login
            console.error('Login error:', error.message);
            //setErrorMessage('Login error');
        }
    }

    //console.log(onShowSignUpForm);

    return (
        <div className='wrapper'>
            {userInfo && <Socket userInfo={{...userInfo, page: hide ? 2 : 1}} />}
            {hide && <button style={{ marginTop: "10px", marginBottom: '10px' }} onClick={() => setHide(x => !x)}>
                <h4>Back to Login</h4>
            </button>}
            {(userInfo && !hide) && <button style={{ marginTop: "10px", marginBottom: '10px' }} onClick={() => setHide(x => !x)}>
                <h4>Dashboard</h4>
            </button>}
            {!hide && <form onSubmit={(e) => { e.preventDefault(); loginRequest() }}>
                <h1>Log In</h1>
                <div className="input-box">
                    <input type="text" ref={usernameRef} placeholder='Username' required />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" ref={passwordRef} placeholder='Password' required />
                    <FaLock className='icon' />
                </div>
                <button type="submit">Submit</button>
                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </form>
            }
            {hide && <UserDashboard />}
        </div>
    );
};

export default LoginForm;