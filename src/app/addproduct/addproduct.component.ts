import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms"
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  islogIn:boolean=false;
  constructor(private service:ProductsService, private router: Router, private authservice:LoginService) { 
    this.authservice.getadmin().subscribe((res:any)=>{
      console.log(res)
      this.islogIn=res;
    })
  }
  formdata = new FormGroup({
    name : new FormControl(''),
    code : new FormControl(''),
    category : new FormControl(''),
    price : new FormControl(''),
    desc : new FormControl(''),
    url : new FormControl(''),
    date : new FormControl(''),
  })
  ngOnInit(): void {
    this.authservice.authChecker().subscribe((res:any)=>{
      if(res.role=='admin')
      this.islogIn=true;
    })
  }

  // verifyToken(){
  //   this.authservice.authChecker().subscribe((res:any)=>{
  //     if(res.role!="admin")
  //     {

  //       this.router.navigate(['login']);
  //     }
  //   })
  // }
  addNewProduct(){

    //console.log((this.formdata.value));
    this.service.addNewProduct(this.formdata.value).subscribe((res:any)=>{
      console.log(res);
      this.formdata.setValue({
        name : '',
        code : '',
        category: '',
        price : '',
        desc : '',
        url : '',
        date:''
      })
    })

  }
}
