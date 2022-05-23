import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MycartService } from '../services/mycart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private mycart: MycartService) { }
  amount:number=1;
  myCart:boolean=false;
  @Input() product:any;
  @Output() deleteitem = new EventEmitter<string>();
  @Output() additem = new EventEmitter<object>();
  ngOnInit(): void {
    this.getDeleteButton();
  }
  addToCart(product:any){
      const data = {
         productId:product._id,
         name:product.name,
         code:product.code,
         category:product.category,
         number:this.amount,
         price:product.price,
         description:product.description,
         url:product.url,
       }

      this.additem.emit(data);
  }
  decrement()
  {
    if(this.amount>1)
    this.amount-=1;
  }
  increment(){
    this.amount+=1;
  }
  getDeleteButton(){
    const path = window.location.pathname;
    if(path=='/my-cart')
    {
      this.myCart=true
    }
    else
    {
      this.myCart=false
    }
  }

  deleteItem(product:any){
    this.deleteitem.emit(product);
    }
}
