import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../providers/auth.service'

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
	constructor(
						private _auth:AuthService,
						private router: Router
						){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (!this._auth.isLogIn()) return true;

    // Navigate to the login page with extras
    this.router.navigateByUrl('home');
    return false;
  }
}
