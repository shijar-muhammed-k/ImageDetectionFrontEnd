import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/service/api.service';
import { UserService } from 'src/app/core/service/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor (
    private fb: FormBuilder,
    private toast: ToastrService,
    private api: ApiService,
    private userService: UserService,
    private loader: NgxUiLoaderService
  ) {}

  loginForm: FormGroup
  imcorrectCredentials: boolean = false;
  loginFormSubmitted: boolean = false;
  signUpForm: FormGroup
  signUpFormSubmitted: boolean = false;


  ngOnInit(): void {
    this.initDesignReq();
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    this.signUpForm = this.fb.group({
      username: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  get lf() {
    return this.loginForm.controls;
  }

  get sf() {
    return this.signUpForm.controls;
  }

  initDesignReq() {
    const loginText = document.querySelector(".title-text .login") as HTMLElement;
    const wrapper = document.querySelector(".wrapper") as HTMLElement;
    const loginForm = document.querySelector("form.login") as HTMLElement;
    const loginBtn = document.querySelector("label.login") as HTMLButtonElement;
    const signupBtn = document.querySelector("label.signup") as HTMLButtonElement;
    const signupLink = document.querySelector("form .signup-link a") as HTMLButtonElement;
    signupBtn.onclick = (()=>{
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
      wrapper.removeAttribute('style');
    });
    loginBtn.onclick = (()=>{
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
      wrapper.style.height = '475px';
    });
    signupLink.onclick = (()=>{
      signupBtn.click();
      return false;
    });
  }

  user_login() {
    this.loginFormSubmitted = true;
    if(this.loginForm.valid) {
      this.loader.start();
      this.api.userLogin(this.loginForm.value).subscribe(data => {
        this.toast.info('Logged in successfully');
        this.userService.setLoggedUser(data);
        this.loader.stop();
      }, error => {
        this.toast.error('Failed to login')
        this.loader.stop();
      })
    }
  }

  user_signUp() {
    this.signUpFormSubmitted = true;
    if(this.signUpForm.valid) {
      this.loader.start();
      this.api.userSignUp(this.signUpForm.value).subscribe(data => {
        this.api.userLogin({username: this.sf['email'].value, password: this.sf['password'].value}).subscribe((data) => {
          this.toast.info('Logged in successfully');
          this.userService.setLoggedUser(data);
          this.loader.stop();
        })
      }, error => {
        this.toast.error('Username already in use')
        this.loader.stop();
      })
    }
  }

}

