import { Component, NgModule, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { PageEvent } from '@angular/material/paginator';
import { MycartService } from '../services/mycart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  length:number=0;
  pageSize:number=10;
  showItem:any;
  constructor(private service:DashboardService,private mycart: MycartService, private router:Router) { }
  data:any;
  ngOnInit(): void {
    this.getdata();
  }
  getdata(){
     this.service.getData().subscribe((res:any)=>{
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
    })
  }
  onPageChange(event: PageEvent){
    console.log(event);
    var startIndex = event.pageIndex * event.pageSize;
    var endIndex = startIndex + event.pageSize;
    if(endIndex > event.length)
       endIndex=event.length;
    this.showItem=this.data.slice(startIndex, endIndex);
  }

}
