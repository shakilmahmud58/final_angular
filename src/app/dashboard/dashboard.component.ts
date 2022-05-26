import { Component, NgModule, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { PageEvent } from '@angular/material/paginator';
import { MycartService } from '../services/mycart.service';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  length:number=0;
  pageSize:number=10;
  showItem:any;
  sortBy = "price";
  orderBy = "asc";
  constructor(private service:DashboardService,private mycart: MycartService, private router:Router, private snackbar: MatSnackBar) { }
  data:any;
  loadItem:boolean=true;
  socket=io('https://server-58.azurewebsites.net');
  ngOnInit(): void {
    this.getdata();
    this.editItemBack();
  }
  getdata(){
     this.service.getData().subscribe((res:any)=>{
       this.loadItem=false;
       this.data=res;
       this.showItem=res.slice(0,10);
       this.length = res.length;
     })
  }
  addToCart(product:any){
    this.mycart.addtocart(product).subscribe((res:any)=>{
      if(res.status==false)
      {
        this.router.navigate(['login']);
      }
      else{
        this.snackbar.open("Product added to cart succesfully","",{
          duration:1500
        })
      }
    })
  }
  onPageChange(event: PageEvent){
    //console.log(event);
    var startIndex = event.pageIndex * event.pageSize;
    var endIndex = startIndex + event.pageSize;
    if(endIndex > event.length)
       endIndex=event.length;
    this.showItem=this.data.slice(startIndex, endIndex);
  }
  editItemBack(){
    this.socket.on('editback',(result:any)=>{
       this.getdata();
    }); 
  }
  changeSortBy(value:any){
    this.service.sortData({sort:value,order:this.orderBy}).subscribe((res:any)=>{
      this.data=res;
      this.showItem=res.slice(0,10);
      this.length = res.length;
    })
  }
  changeOrderBy(value:any){
    this.service.sortData({sort:this.sortBy,order:value}).subscribe((res:any)=>{
      this.data=res;
      this.showItem=res.slice(0,10);
      this.length = res.length;
    });
  }

}
