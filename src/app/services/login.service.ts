import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  of, Subject, tap } from 'rxjs';
import jwt_decode from 'jwt-decode'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }
  public admin = new Subject<boolean>()
  public user = new Subject<boolean>()
  getadmin(){
     return this.admin.asObservable();
  }
  getuser(){
    return this.user.asObservable();
 }
  logInUser(data:any){
    return this.http.post('http://localhost:5000/login',data);
  }
  registerUser(data:any){
    return this.http.post('http://localhost:5000/addNewUser',data);
  }
  authChecker(){
    return this.http.get('http://localhost:5000/tokenverify');
  }
  verifytoken(){
    const token = localStorage.getItem('Auth-Token');
    if(token){
      const payLoad =new Array(jwt_decode(`${token}`));
      const admin=(payLoad[0].role);
      if(admin=='admin')
        return true;
      else return false
    }
    else
      return false;
  }
  verifyusertoken(){
    const token = localStorage.getItem('Auth-Token');
    if(token){
      const payLoad =new Array(jwt_decode(`${token}`));
      const admin=(payLoad[0].role);
      if(admin)
        return true;
      else
        return false;
    }
    else
    {
      return false;
    }
  }
}
