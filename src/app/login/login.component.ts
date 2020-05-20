import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { IUser } from '../Users';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  loginForm:FormGroup;
  user:IUser;

  constructor(private fb:FormBuilder,private _authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['',[Validators.required,Validators.minLength(3)]],
      password:['',Validators.required]
    });
    this._authService.loginUser().subscribe(
      data => this.user = data
    );
  }

  loginUser(){
    if(this.user.username=== this.username.value &&this.user.password=== this.password.value){
      localStorage.setItem('token',"present");
      this.router.navigate(['./expenses']);
    }
  }
}
