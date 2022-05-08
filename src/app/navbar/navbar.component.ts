import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router : Router, private loginservice: LoginService) { }
  role:any;
  ngOnInit(): void {
    this.loginservice.getMsg().subscribe((res:any)=>{
      this.role=res.role;
      console.log(this.role);
    })
    console.log(this.role)
  }
  logOut(){
    localStorage.removeItem('Auth-Token');
    this.router.navigate(['login']);
  }

}
