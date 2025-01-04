import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    return (
        <body class="app app-login p-0">
           <div class="row g-0 app-auth-wrapper">
	    <div class="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
		    <div class="d-flex flex-column align-content-end">
			    <div class="app-auth-body mx-auto">	
				    <div class="app-auth-branding mb-4"><a class="app-logo" href="index.html"><img class="logo-icon me-2" src="assets/images/app-logo.svg" alt="logo"/></a></div>
					<h2 class="auth-heading text-center mb-4">Đặt lại mật khẩu</h2>

					<div class="auth-intro mb-4 text-center">Nhập địa chỉ email tài khoản admin của bạn.</div>
	
					<div class="auth-form-container text-left">
						
						<form class="auth-form resetpass-form">                
							<div class="email mb-3">
								<label class="sr-only" for="reg-email">Email</label>
								<input id="reg-email" name="reg-email" type="email" class="form-control login-email" placeholder="Email của bạn" required="required"/>
							</div>
							<div class="text-center">
								<button type="submit" class="btn app-btn-primary btn-block theme-btn mx-auto">Đặt lại</button>
							</div>
						</form>
						
						<div class="auth-option text-center pt-5"><Link class="app-link" to="/admin/login" >Đăng nhập</Link></div>
					</div>


			    </div>
		    
			    <footer class="app-auth-footer">
				    <div class="container text-center py-3">
			        <small class="copyright">Designed with <span class="sr-only">love</span><i class="fas fa-heart" style={{color: '#fb866a'}}></i> by <Link class="app-link" to="http://themes.3rdwavemedia.com" target="_blank">Xiaoying Riley</Link> for developers</small>
				       
				    </div>
			    </footer>
		    </div> 
	    </div>
	    <div class="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
		    <div class="auth-background-holder">
		    </div>
		    <div class="auth-background-mask"></div>
		    <div class="auth-background-overlay p-3 p-lg-5">
			    <div class="d-flex flex-column align-content-end h-100">
				    <div class="h-100"></div>
				    
				</div>
		    </div>
	    </div>
    
    </div>
        </body>
    )
}
export default ResetPassword;