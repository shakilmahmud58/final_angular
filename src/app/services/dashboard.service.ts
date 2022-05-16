import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  getData(){
    return this.http.get('http://localhost:5000/getProducts');
  }
  sortData(data:any){
    return this.http.post('http://localhost:5000/sortProducts',data);
  }
}
