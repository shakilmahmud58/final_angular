import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms"
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ProductsService } from '../services/products.service';
import { io } from 'socket.io-client';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  islogIn:boolean=false;
  loadItem:boolean=true;
  constructor(private service:ProductsService, private router: Router, private authservice:LoginService, private snackbar:MatSnackBar) { 
    this.authservice.getadmin().subscribe((res:any)=>{
      console.log(res)
      this.islogIn=res;
    })
    this.stateData = (this.router.getCurrentNavigation()?.extras.state);
    this.editData = this.stateData?.product;
  }
  stateData:any;
  editData:any;
  socket=io('https://server-58.azurewebsites.net');
  formdata = new FormGroup({
    name : new FormControl(''),
    code : new FormControl(''),
    category : new FormControl(''),
    price : new FormControl(''),
    description : new FormControl(''),
    url : new FormControl(''),
    date : new FormControl(''),
  })
  ngOnInit(): void {
    this.authservice.authChecker().subscribe((res:any)=>{
      if(res.role=='admin')
      {
        this.islogIn=true;
        this.loadItem=false
      }
      this.checkStateData()
      
    })
    
  }
  checkStateData(){
    if(this.editData)
    {
      this.formdata= new FormGroup({
        name : new FormControl(this.editData.name),
        code : new FormControl(this.editData.code),
        category : new FormControl(this.editData.category),
        price : new FormControl(this.editData.price),
        description : new FormControl(this.editData.description),
        url : new FormControl(this.editData.url),
        date : new FormControl(this.editData.date),
      })
    }
  }
  addNewProduct(){

    //console.log((this.formdata.value));
    this.service.addNewProduct(this.formdata.value).subscribe((res:any)=>{
      this.snackbar.open("Product added successfully",'',{
        duration:1500
      })
      this.formdata = new FormGroup({
        name : new FormControl(''),
        code : new FormControl(''),
        category : new FormControl(''),
        price : new FormControl(''),
        description : new FormControl(''),
        url : new FormControl(''),
        date : new FormControl(''),
      })
    })

  }

  updateProduct(){
    const id = this.editData._id;
    this.service.editProduct({id:id, data:this.formdata.value}).subscribe((res:any)=>{
  
    })
    this.socket.emit('edit',{id:id, data:this.formdata.value});
    //console.log(this.formdata.value);
    this.editData=null;
    this.formdata = new FormGroup({
      name : new FormControl(''),
      code : new FormControl(''),
      category : new FormControl(''),
      price : new FormControl(''),
      description : new FormControl(''),
      url : new FormControl(''),
      date : new FormControl(''),
    })
  }
}
