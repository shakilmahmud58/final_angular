import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MycartService {

  constructor(private http: HttpClient) { }
  addtocart(data:any){
    return this.http.post('http://localhost:5000/addToCart',data);
  }
  getcartproducts(){
    return this.http.get('http://localhost:5000/getcartproducts');
  }
  deletecartproducts(id:any,pid:any){
    return this.http.post('http://localhost:5000/deletecartproducts',{_id:id,pid});
  }
}
