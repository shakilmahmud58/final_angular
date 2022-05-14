import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../services/login.service';
import { MycartService } from '../services/mycart.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';


@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  constructor(private service: MycartService, private dialog: MatDialog) {}
  cartProducts:any;
  ngOnInit(): void {
    this.getCartProducts();
  }
  getCartProducts(){
     this.service.getcartproducts().subscribe((res:any)=>{
       this.cartProducts=res;
       console.log(this.cartProducts);
     })
  }
  deleteItem(id:any,pid:any){
      this.service.deletecartproducts(id,pid).subscribe((res:any)=>{
        //console.log(res);
        if(res.status!=false){
          this.cartProducts=this.cartProducts.filter((x:any)=>{
            return x._id !== id 
          });
        }
      })
  }
  deleteEvent(product:any){
    console.log(product)
    const dialogbox = this.dialog.open(DialogBoxComponent,{
      width: "400px",
      height:"150px",
      data:'my-cart',
      disableClose:true
    })
    dialogbox.afterClosed().subscribe((result:any) => {
       if(result.delete==true)
       {
          this.deleteItem(product._id,product.productId);   
       }
    });
  }
}
