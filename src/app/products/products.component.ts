import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  islogIn:boolean=false;
  constructor(private router:Router, private snackbar:MatSnackBar, private service:ProductsService, private dialog:MatDialog, private authservice: LoginService) {
    this.authservice.getadmin().subscribe((res:any)=>{
      console.log(res)
      this.islogIn=res;
    })
 
   }

  products:any;
  showProducts:any;
  length:number=0;
  pageSize:number=10;
  loadItem:boolean=true;
  displayedColumns = ['name', 'code', 'category', 'price', 'date','_id'];
  // dataSource = new MatTableDataSource<any>()
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
  onpageChange(event: PageEvent){
    var startIndex = event.pageIndex * event.pageSize;
    var endIndex = startIndex + event.pageSize;
    if(endIndex > event.length)
       endIndex=event.length;
    this.showProducts=this.products.slice(startIndex, endIndex);
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
      this.showProducts=this.products.slice(0,10);
    })
  }
  getProducts(){
     this.service.getProductList().subscribe((res:any)=>{
       //console.log(res);
       this.loadItem=false;
       this.islogIn=true
       this.products=res;
       this.showProducts=this.products.slice(0,10);
       this.length=res.length;
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

