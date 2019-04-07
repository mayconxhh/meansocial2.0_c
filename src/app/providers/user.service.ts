import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.models';
import { GlobalService } from './global.service';
import { AuthService } from './auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

	public url:string;
  public identity;
  public stats;

  constructor( private http:HttpClient,
			  				private global:GlobalService,
			  				private Auth:AuthService
			  			) {

  	this.url = this.global.url;

  }

  register(user:User): Observable<any>{
  	let json = JSON.stringify(user);
  	let url = `${this.url}/user`;

  	let headers = new HttpHeaders({
  		'Content-type': 'application/json'
  	});

  	return this.http
									.post<any>(url, json, { headers: headers })
									.pipe(map(data=>{
										return data;
									}))

  }

  login(user:User): Observable<any>{
    let json = JSON.stringify(user);
    let url = `${this.url}/login`;

    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    return this.http
          .post(url, json, { headers: headers })
          .pipe(map(res=>{
            if(res['success']){
              this.setIdentity(res['user'])
              this.Auth.setToken(res['token']);
              this.identity = res['user'];
            }
            return res as Object;
          }))
  }

  setIdentity(user):Observable<any>{
    localStorage.setItem('identity',JSON.stringify(user));
    return;
  }

  getIdentity():Observable<any>{
    return JSON.parse(localStorage.getItem('identity'));
  }

  setStats(stats):Observable<any>{
    localStorage.setItem('stats', JSON.stringify(stats));
    return;
  }
  
  getStats():Observable<any>{
    if (localStorage.getItem('stats')) {
      this.stats = JSON.parse(localStorage.getItem('stats'));
    } else {
      this.stats = null;
    }

    return this.stats;
  }

  getCounters(userId = null): Observable<any>{
    let url:string;

    if (userId) {
      url = `${this.url}/counters/${userId}`;
    } else {
      url = `${this.url}/counters`;
    }

    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    return this.http
            .get<any>(url, { headers: headers })
            .pipe(map(res=>{
              return res as Object;
            }))

  }

  updateUser(user:User): Observable<any>{

    let params = JSON.stringify(user);

    let url = `${this.url}/user/${user._id}`;

    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    return this.http
                  .put( url, params, { headers: headers })
                  .pipe(map(res=>{
                    return res as Object;
                  }));

  }

  getUsers(page = null):Observable<any>{

    let url = `${this.url}/users/${page}`;

    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    return this
              .http
              .get(url, { headers: headers })
              .pipe(map(res=>{
                return res as Object;
              }));

  }

  getUser(id):Observable<any>{

    let url = `${this.url}/user/${id}`;

    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    return this
              .http
              .get(url, { headers: headers })
              .pipe(map(res=>{
                return res as Object;
              }));

  }

}
