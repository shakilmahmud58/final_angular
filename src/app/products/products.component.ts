import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { LoginService } from '../services/login.service';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  islogIn:boolean=false;
  constructor(private router:Router, private service:ProductsService, private dialog:MatDialog, private authservice: LoginService) {
    this.authservice.getadmin().subscribe((res:any)=>{
      console.log(res)
      this.islogIn=res;
    })
   }
  products:any;
  displayedColumns = ['name', 'code', 'category', 'price', 'date','_id'];

  ngOnInit(): void {
    this.authservice.authChecker().subscribe((res:any)=>{
      if(res.role=='admin')
      this.islogIn=true;
    })
    this.getProducts();
  }
  addProduct(){
    this.router.navigate(['products/create']);
    //alert("clicked");
  }
  verifyToken(){
    this.authservice.authChecker().subscribe((res:any)=>{
      if(res.role=='admin')
      {
        this.authservice.admin.next(true)
        this.router.navigate(['products'])
      }
      else
      {
        this.authservice.admin.next(false)
        this.router.navigate(['login']);
      }
    })
  }
  getProducts(){
     this.service.getProductList().subscribe((res:any)=>{
       //console.log(res);
       this.products=res;
     })
  }
  editItem(id:any){
    alert(id);
  }
  deleteItem(id:any){
    this.service.deleteProduct(id).subscribe((res:any)=>{
      console.log(res);
      if(res.status!=false){
        this.products=this.products.filter((x:any)=>{
          return x._id !== id 
        });
      }
      else
      {
        alert("You have no access");
      }

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

