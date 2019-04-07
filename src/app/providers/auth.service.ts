import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router ) {}

  setToken(tk){
    if (tk) {
      localStorage.setItem('tk',JSON.stringify(tk));
    } else {
      localStorage.removeItem('tk');
    }
  	return;
  }

  getToken(){
  	return JSON.parse(localStorage.getItem('tk'));
  }

  isLogIn() {
  	if (localStorage.getItem('tk')) {
  		return true;
  	}

  	return false;
  }

  logout(){
    this.setToken(null);
    localStorage.removeItem('identity');
    localStorage.removeItem('stats');
    this.router.navigateByUrl('login');
  }
}
