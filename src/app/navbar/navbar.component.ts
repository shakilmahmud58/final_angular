import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:boolean=false;
  admin:boolean=false;
  constructor(private router : Router, private loginservice: LoginService) { 
    this.loginservice.getadmin().subscribe((res:any)=>{
      console.log(res)
      this.admin=res;
    })
    this.loginservice.getuser().subscribe((res:any)=>{
      console.log(res)
      this.user=res;
    })
  }
  role:any;
  ngOnInit(): void {
    this.loginservice.authChecker().subscribe((res:any)=>{
      if(res.role=='admin')
        {this.admin=true; this.user=false}
      else if(res.role=='user')
        {this.user=true; this.admin=false}
      else
      {
        this.admin=false;
        this.user=false;
      }

    })

  }
  logOut(){
    localStorage.removeItem('Auth-Token');
    this.loginservice.admin.next(false);
    this.loginservice.user.next(false);
    this.router.navigate(['login']);
  }

}
