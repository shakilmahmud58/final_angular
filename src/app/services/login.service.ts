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
  url:string='https://server-58.azurewebsites.net';
  getadmin(){
     return this.admin.asObservable();
  }
  getuser(){
    return this.user.asObservable();
 }
  logInUser(data:any){
    return this.http.post(this.url+'/login',data);
  }
  registerUser(data:any){
    return this.http.post(this.url+'/addNewUser',data);
  }
  authChecker(){
    return this.http.get(this.url+'/tokenverify');
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
      const role=(payLoad[0].role);
      if(role)
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
