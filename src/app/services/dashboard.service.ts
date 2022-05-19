import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url:string='https://server-58.azurewebsites.net';
  constructor(private http:HttpClient) { }
  getData(){
    return this.http.get(this.url+'/getProducts');
  }
  sortData(data:any){
    return this.http.post(this.url+'/sortProducts',data);
  }
}
