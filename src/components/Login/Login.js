import React from 'react';
import './Login.css'
import { useState } from 'react';
import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { userContext } from '../../App';
import { createUserWithEmailAndPassword, handleFbSingIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';


const Login = () => {

    const [error, setError] = useState('');

    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    initializeLoginFramework()

    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }

    const fbSingIn = () => {
        handleFbSingIn()
            .then(res => {
                handleResponse(res, true)
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false)
            })
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setError(res.error)
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword]= useState('')

    const handleChange = (event) => {
        let isFiledValid = true;

        if (event.target.name === 'email') {
            isFiledValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            isFiledValid = /\d{1}/.test(event.target.value) && event.target.value.length >= 8;
            setPassword(event.target.value)
            if (!isFiledValid) {
                alert("password should must be a combination of letter and number and it's length greater than 8")
            }
        }
        if (event.target.name === 'Confirm-password') {
            setConfirmPassword(event.target.value);
            isFiledValid = password === confirmPassword;
        }
        if (isFiledValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo)
        }
    }

    const handleSubmit = (e) => {

        if (newUser && user.email && user.password) {
            if (password !== confirmPassword) {
                const confirmPasswordError = "Password and  confirm password doesn't  match";
                setError(confirmPasswordError);
            }else{

                createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
            }
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        e.preventDefault()
    }





    return (
        <div className="login-container">

            <div className="login-with-email-pass">
                <form className="form-group" onSubmit={handleSubmit}>
                    {
                        newUser &&
                        <input type="text" onBlur={handleChange} name="name" placeholder="Full Name" />
                    }
                    <input type="email" onBlur={handleChange} name="email" placeholder="Email" required />

                    <input type="password" onBlur={handleChange} name="password" placeholder="Password" required />

                    {
                        !newUser &&
                        <div className="rememberME-and-forgot-box">
                            <div className="remember-me">
                                <input type="checkbox" name="remember" id="remember" />
                                <label htmlFor="remember">Remember Me</label>
                            </div>
                            <div className="forgot-password">
                                <span>Forgot Password</span>
                            </div>

                        </div>
                    }

                    {
                        newUser &&
                        <input type="password" onBlur={handleChange} name="Confirm-password" placeholder="Confirm Password" required />
                    }


                    <input className="login-btn" type="submit" value={newUser ? 'Create an account' : 'LOGIN'} />
                </form>

                <div className="">
                    <b>{newUser ? 'Already have an account ' : 'Don’t have an account? '}</b>
                    <span className="login-link" onClick={() => setNewUser(!newUser)}>{newUser ? ' Login' : ' Create an account'}</span>
                </div>

                <p style={{ color: 'red' }}>{error}</p>

                {
                    user.success &&
                    <p style={{ color: 'green' }}>User {newUser ? 'created' : 'login'} Successfully</p>
                }

            </div>

            <div className="or-line">
                <span></span>
                <b>Or</b>
                <span></span>
            </div>

            <div className="sign-in-with-social">
                <p onClick={googleSignIn}><FontAwesomeIcon icon={faGoogle} className="social-icon google-icon" /> <span>Sign in with Google</span></p>
                <p onClick={fbSingIn}><FontAwesomeIcon icon={faFacebook} className="social-icon facebook-icon" /> <span>Sign in with Facebook</span></p>
            </div>

        </div>
    );
};

export default Login;