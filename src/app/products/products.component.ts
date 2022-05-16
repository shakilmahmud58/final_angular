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
  sortChange(e:any){
    const sortBy= e.active;
    const orderBy = e.direction;
    this.service.sortProducts({sort:sortBy,order:orderBy}).subscribe((res)=>{
      this.products=res;
    })
  }
  getProducts(){
     this.service.getProductList().subscribe((res:any)=>{
       console.log(res);
       this.products=res;
     })
  }
  editItem(product:any){
    
    this.router.navigateByUrl('products/create',{state:{product:product}});
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

  openDialog(product:any){
    console.log(product)
    const dialogbox = this.dialog.open(DialogBoxComponent,{
      width: "400px",
      height:"160px",
      data:"products list",
      disableClose:true
    })
    dialogbox.afterClosed().subscribe((result:any) => {
       if(result.delete==true)
       {
          this.deleteItem(product._id);   
       }
    });
  }

}

