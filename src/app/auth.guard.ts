import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service:AuthService,private router:Router){}

  canActivate(): boolean  {
    if (this.service.loggedIn()) {
     return true;
    } else {
      alert('Please login for booking details!!');
      this.router.navigate(['login']);
    }
  }
  
}
