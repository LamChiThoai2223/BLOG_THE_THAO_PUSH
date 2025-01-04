import React from 'react';
import { Link } from 'react-router-dom';
const RegisterForm = () => {
    return (
        <div className="content">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 contents">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="form-block p-4 shadow-sm rounded ">
                                    <div className="mb-4">
                                        <h3>Đăng ký tài khoản</h3>
                                    </div>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="username">Tên đăng nhập</label>
                                            <input type="text" className="form-control" id="username" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Mật khẩu</label>
                                            <input type="password" className="form-control" id="password" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                                            <input type="password" className="form-control" id="confirmPassword" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" id="email" />
                                        </div>
                                        <div className='text-center mt-4'>
                                            <input type="submit" value="Đăng ký" className="btn btn-pill text-white btn-block btn-primary" />
                                        </div>
                                      
                                    </form>
                                    <span className="d-block text-center my-4 text-muted"> Bạn đã có tài khoản ?</span>
                                    <div className="d-flex justify-content-center">
                                        <Link to="/login" className="btn btn-outline-primary btn-pill">
                                            Đăng nhập
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
