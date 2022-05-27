import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../services/login.service';
import { MycartService } from '../services/mycart.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { io } from 'socket.io-client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  constructor(private router:Router, private service: MycartService, private dialog: MatDialog, private authservice: LoginService, private snackbar:MatSnackBar) {}
  cartProducts:any;
  islogIn:boolean=false;
  loadItem:boolean=true;
  productNumber:boolean=false;
  socket=io('https://server-58.azurewebsites.net');
  ngOnInit(): void {
    this.authservice.authChecker().subscribe((res:any)=>{
      if(res.role=="admin" || res.role=="user")
      {
        this.islogIn=true;
        this.loadItem=false
      }
    })
    this.getCartProducts();
    this.editItemBack();
  }
  editItemBack(){
    this.socket.on('editback',(result:any)=>{
       this.getCartProducts();
    });
  }
  gotodashboard(){
    this.router.navigate(['dashboard']);
  }
  getCartProducts(){
     this.service.getcartproducts().subscribe((res:any)=>{
       if(res.length==0)
       {
          this.productNumber=true;
       }
       else{
        this.cartProducts=res;
       }
     })
  }
  deleteItem(id:any,pid:any){
      this.service.deletecartproducts(id,pid).subscribe((res:any)=>{
        //console.log(res);
        if(res.status!=false){
          this.snackbar.open('Deleted Successfully','',{duration:1500})
          this.cartProducts=this.cartProducts.filter((x:any)=>{
            return x._id !== id 
          });
          if(this.cartProducts.length==0)
          {
            this.productNumber=true;
          }
        }
      })
  }

  deleteEvent(product:any){
    //console.log(product)
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
