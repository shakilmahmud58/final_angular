import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  addNewProduct(data:any){
    return this.http.post('http://localhost:5000/addProduct',data);
  }
  getProductList(){
    return this.http.get('http://localhost:5000/getProducts');
  }
  deleteProduct(id:any){
    return this.http.post('http://localhost:5000/deleteProduct',{_id:id});
  }
  editProduct(product:any){
    return this.http.post('http://localhost:5000/editProduct',product);
  }
  sortProducts(data:any){
    return this.http.post('http://localhost:5000/sortProducts',data);
  }
}
