import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
    return (
        <div className="content">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 contents">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="form-block">
                                    <div className="mb-4">
                                        <h3>Quên mật khẩu</h3>
                                        <p>Vui lòng nhập email của bạn để khôi phục mật khẩu</p>
                                    </div>
                                    <form action="#" method="post">
                                        <div className="form-group first">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" id="email" />
                                        </div>
                                        <div className='text-center mt-4'>
                                            <input type="submit" value="Gửi yêu cầu" className="btn btn-pill text-white btn-block btn-primary" />
                                        </div>
                                    </form>
                                    <div className="text-center mt-3">
                                        <Link to="/login" className="text-muted">Quay lại đăng nhập</Link>
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

export default ForgotPasswordForm;
