import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  url:string='https://server-58.azurewebsites.net';
  addNewProduct(data:any){
    return this.http.post(this.url+'/addProduct',data);
  }
  getProductList(){
    return this.http.get(this.url+'/getProducts');
  }
  deleteProduct(id:any){
    return this.http.post(this.url+'/deleteProduct',{_id:id});
  }
  editProduct(product:any){
    return this.http.post(this.url+'/editProduct',product);
  }
  sortProducts(data:any){
    return this.http.post(this.url+'/sortProducts',data);
  }
}
