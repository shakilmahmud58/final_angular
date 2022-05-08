import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  public content = new Subject<any>()
  setMsg(data:any){
    return this.content.next(data);
  }
  getMsg(){
    return this.content.asObservable();
  }
  logInUser(data:any){
    return this.http.post('http://localhost:5000/login',data);
  }
  registerUser(data:any){
    return this.http.post('http://localhost:5000/addNewUser',data);
  }
  authChecker(){
    console.log("hit")
    return this.http.get('http://localhost:5000/tokenverify')
  }
}
