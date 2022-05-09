import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

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
  constructor(private loginService: LoginService, private router: Router) { console.log('login')}

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
      if(res.code==true)
      {
        if(res.role=='admin'){
          this.loginService.admin.next(true);
          // this.loginService.getToken(res.token);
          localStorage.setItem('Auth-Token',res.token);
          this.router.navigate(['products']);
        }
        else{
          this.loginService.user.next(true);
          // this.loginService.getToken(res.token);
          localStorage.setItem('Auth-Token',res.token);
          this.router.navigate(['my-cart']);
        }

      }
      else
      {
        alert("wrong data");
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
        alert("This email is taken");
      }
    })
  }
}
