import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  islogIn:boolean=false;
  constructor(private router:Router, private snackbar:MatSnackBar, private service:ProductsService, private dialog:MatDialog, private authservice: LoginService) {
    this.authservice.getadmin().subscribe((res:any)=>{
      console.log(res)
      this.islogIn=res;
    })
   }

  products:any;
  loadItem:boolean=true;
  displayedColumns = ['name', 'code', 'category', 'price', 'date','_id'];

  ngOnInit(): void {
    this.authservice.authChecker().subscribe((res:any)=>{
      if(res.role=='admin')
      {
        this.getProducts();

      }
      else{
        this.loadItem=false;
        this.islogIn=false;
      }
    })
    

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
       //console.log(res);
       this.loadItem=false;
       this.islogIn=true
       this.products=res;
     })
  }
  editItem(product:any){
    
    this.router.navigateByUrl('products/create',{state:{product:product}});
  }

  deleteItem(id:any){
    this.service.deleteProduct(id).subscribe((res:any)=>{
      //console.log(res);
      if(res.status!=false){
        this.snackbar.open('Deleted Successfully','',{duration:1500})
        this.products=this.products.filter((x:any)=>{
          return x._id !== id 
        });
      }
      else
      {
        this.snackbar.open('You have no access','',{duration:1500})
      }

    })
  }

  openDialog(product:any){
    //console.log(product)
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

