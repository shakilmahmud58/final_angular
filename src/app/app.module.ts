import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MycartComponent } from './mycart/mycart.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { AddproductComponent } from './addproduct/addproduct.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { LoginComponent } from './login/login.component';
import { AdminguardGuard } from './guards/adminguard.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminInterceptor } from './interceptors/admin.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    NavbarComponent,
    ProductComponent,
    AddproductComponent,
    DialogBoxComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    RouterModule.forRoot([
      {path:'dashboard', component: DashboardComponent},
      {path:'products', component: ProductsComponent, canActivate:[AdminguardGuard]},
      {path:'my-cart', component: MycartComponent},
      {path:'login', component: LoginComponent},
      {path:'products/create', component: AddproductComponent},
      {path:"" , redirectTo:'dashboard', pathMatch:"full"}
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
