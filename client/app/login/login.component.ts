import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  // ****************************登录部分*******************
  loginForm: FormGroup;
  loginEmail = new FormControl('', [Validators.required,
                                       Validators.minLength(3),
                                       Validators.maxLength(100)]);
  loginPassword = new FormControl('', [Validators.required,
                                          Validators.minLength(6)]);
  //切换tab
  tab ='login';
  // ****************************注册部分*******************
  registerForm: FormGroup;
  username = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30),
                                  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  registerEmail = new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(100)]);
  registerPassword = new FormControl('', [Validators.required,Validators.minLength(6)]);

  role = new FormControl('', [Validators.required]);

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(['/cats']);
    }
    this.loginForm = this.formBuilder.group({
      loginEmail: this.loginEmail,
      loginPassword: this.loginPassword
    });

    this.registerForm = this.formBuilder.group({
      username: this.username,
      registerEmail: this.registerEmail,
      registerPassword: this.registerPassword,
      role: this.role
    });
  }

  setClassLoginEmail() {
    return { 'has-danger': !this.loginEmail.pristine && !this.loginEmail.valid };
  }
  setClassLoginPassword() {
    return { 'has-danger': !this.loginPassword.pristine && !this.loginPassword.valid };
  }

  setClassRegisterEmail() {
    return { 'has-danger': !this.registerEmail.pristine && !this.registerEmail.valid };
  }
  setClassRegisterPassword() {
    return { 'has-danger': !this.registerPassword.pristine && !this.registerPassword.valid };
  }

  setClassUsername() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      res => this.router.navigate(['/cats']),
      error => this.toast.setMessage('无效的邮箱或密码!', 'danger')
    );
  }

   register() {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('注册成功!', 'success');
        this.router.navigate(['/']);
      },
      error => this.toast.setMessage('邮箱已存在', 'danger')
    );
  }

}
