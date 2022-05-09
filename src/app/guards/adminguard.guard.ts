import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  islog:boolean=false;
  constructor(private service: LoginService, private router: Router){
  //   this.service.getadmin().subscribe((res:any)=>{
  //     console.log(res)
  //     this.islog=res;
  //   })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       if(!this.service.verifytoken())
       return this.router.createUrlTree(['login']);
       return true
  }
  
}
