import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MycartService {

  constructor(private http: HttpClient) { }
  url:string='https://server-58.azurewebsites.net';
  addtocart(data:any){
    return this.http.post(this.url+'/addToCart',data);
  }
  getcartproducts(){
    return this.http.get(this.url+'/getcartproducts');
  }
  deletecartproducts(id:any,pid:any){
    return this.http.post(this.url+'/deletecartproducts',{_id:id,pid});
  }
}
