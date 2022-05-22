import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string='';
  email:string='';
  password:string='';
  loginForm:boolean=true;
  constructor(private loginService: LoginService, private router: Router, private snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }
  switch(){
    this.loginForm=!this.loginForm;
  };
  logIn(){
    const user ={
      email: this.email,
      password : this.password
    }
    this.loginService.logInUser(user).subscribe((res:any)=>{
      this.password='';
      if(res.code==true)
      {
        if(res.role=='admin'){
          this.loginService.admin.next(true);
          localStorage.setItem('Auth-Token',res.token);
          this.router.navigate(['products']);
        }
        else{
          this.loginService.user.next(true);
          localStorage.setItem('Auth-Token',res.token);
          this.router.navigate(['my-cart']);
        }

      }
      else
      {
        this.snackbar.open('This credential is not valid','',{duration:1500})
      }
    })

  };
  signUp(){
    const newUser ={
      name:this.name,
      email: this.email,
      password: this.password
    }
    this.loginService.registerUser(newUser).subscribe((res:any)=>{
      this.password='';
      if(res.code==true)
      {
        this.loginForm = true;
      }
      else
      {
        this.snackbar.open('This email is taken','',{duration:1500})
      }
    })
  }
}
