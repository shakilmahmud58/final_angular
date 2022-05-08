import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router:Router, private service:ProductsService, private dialog:MatDialog, private authservice: LoginService) { }
  products:any;
  displayedColumns = ['name', 'code', 'category', 'price', 'date','_id'];

  ngOnInit(): void {
    this.verifyToken();
  }
  addProduct(){
    this.router.navigate(['products/create']);
    //alert("clicked");
  }
  verifyToken(){
    this.authservice.authChecker().subscribe((res:any)=>{
      if(res.status!=true)
      {
        //this.authservice.setMsg(res);
        this.router.navigate(['login']);
      }
      else
      {
        //this.authservice.setMsg(res);
        this.getProducts();
      }
    })
  }
  getProducts(){
     this.service.getProductList().subscribe((res:any)=>{
       console.log(res);
       this.products=res;
     })
  }
  editItem(id:any){
    alert(id);
  }
  deleteItem(id:any){
    //confirm("Are you sure to delete this product?")
    this.service.deleteProduct(id).subscribe((res:any)=>{
      this.products=this.products.filter((x:any)=>{
        return x._id !== id 
      });
    })
  }

  openDialog(id:any){
    const dialogbox = this.dialog.open(DialogBoxComponent,{
      width: "300px",
      height:"140px",
      disableClose:true
    })
    dialogbox.afterClosed().subscribe((result:any) => {
       if(result.delete==true)
       {
          this.deleteItem(id);   
       }
    });
  }

}

