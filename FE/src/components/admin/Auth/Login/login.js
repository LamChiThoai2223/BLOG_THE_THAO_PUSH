import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../../services/Auth/index';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [error, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'role']);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const role = useCookies(['role']);
    console.log(role);
    

    
    const onSubmit = async (data) => {
        const { username, password } = data;
        await login(username, password, (error, response) => {
            if (error) {
                toast.error('Login failed!');
                console.error('Login failed:', error);
            } else {
                const { token, user } = response;
                
                // Lưu token và role vào cookies với maxAge
                setCookie('token', token, {
                    path: '/', 
                    maxAge: 30 * 60, // 30 phút
                    sameSite: 'Strict'
                });
                setCookie('role', user.role, {
                    path: '/', 
                    maxAge: 30 * 60, 
                    sameSite: 'Strict'
                });
    
                if (user.role === 'admin') {
                    console.log(user.role);
                    toast.success('Login successful!', { autoClose: 1000 });      
                        navigate('/admin');
                } else {
                    toast.error('Login failed!');
                    console.log(user.role);
            }
    }});
    };

    useEffect(() => {
        const tokenExpiry = setTimeout(() => {
            removeCookie('token', { path: '/' });
            toast.info('Session expired. Please log in again.');
        }, 30 * 60 * 1000); 
    
        return () => clearTimeout(tokenExpiry);
    }, [removeCookie, navigate]);

    return (
        <div className="app app-login p-0">
            <div className="row g-0 app-auth-wrapper">
                <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
                    <div className="d-flex flex-column align-content-end">
                        <div className="app-auth-body mx-auto">
                            <h2 className="auth-heading text-center mb-5">Login Admin</h2>
                            <div className="auth-form-container text-start">
                                <form className="auth-form login-form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="email mb-3">
                                        <label className="sr-only" htmlFor="signin-email">Username:</label>
                                        <input
                                            type="text"
                                            id="signin-email"
                                            className="form-control signin-email"
                                            placeholder="Username..."
                                            {...register('username', { required: 'Username is required' })}
                                        />
                                        {errors.username && <p className="error-message">{errors.username.message}</p>}
                                    </div>
                                    <div className="password mb-3">
                                        <label className="sr-only" htmlFor="signin-password">Password:</label>
                                        <input
                                            id="signin-password"
                                            name="signin-password"
                                            type="password"
                                            className="form-control signin-password"
                                            placeholder="Password..."
                                            {...register('password', { required: 'Password is required' })}
                                        />
                                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                                    </div>
                                    {error && <p className="error-message">{error}</p>}
                                    <div className="extra mt-3 row justify-content-between">
                                        <div className="col-6">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="RememberPassword"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn app-btn-primary w-100 theme-btn mx-auto">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                    <div className="auth-background-holder"></div>
                    <div className="auth-background-mask"></div>
                    <div className="auth-background-overlay p-3 p-lg-5">
                        <div className="d-flex flex-column align-content-end h-100">
                            <div className="h-100"></div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
