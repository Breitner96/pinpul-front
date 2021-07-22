import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private _router: Router ){

  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ){

    if (localStorage.getItem('access_token')) { return true; }

    localStorage.removeItem('access_token');
    this._router.navigateByUrl('/login');
    return false;
    
  }
  
}
