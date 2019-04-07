import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../providers/auth.service';
@Injectable()
export class AuthenticatedService implements HttpInterceptor {

	constructor( private _as:AuthService ){};


  intercept(req, next) {

  	if (this._as.getToken()) {
	  	let tkreq = req.clone({
	  		setHeaders: {
	  			Authorization: this._as.getToken()
	  		}
	  	});

	    return next.handle(tkreq);
  	} else {
			let tkreq = req.clone({
				setHeaders: {
					Authorization: 'null'
				}
			});

		  return next.handle(tkreq);
  	}


  }
}