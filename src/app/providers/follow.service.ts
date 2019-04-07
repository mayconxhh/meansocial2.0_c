import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Follow } from '../models/follow.models';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
	public url:string;

	public headers:HttpHeaders = new HttpHeaders({
		'Content-type': 'application/json'
	});

  constructor(
  							private _gs:GlobalService,
  							private http:HttpClient
  	) {

  	this.url = this._gs.url;

  }

  addFollow(follow):Observable<any>{
  	let params = JSON.stringify(follow);
  	let url = `${this.url}/follow`;

  	return this.http
  								.post( url, params, { headers: this.headers })
  								.pipe(map(res=>{
  									return res as Object;
  								}))

  }

  deleteFollow(id):Observable<any>{

  	let url = `${this.url}/follow/${id}`;

  	return this.http
  								.delete( url, { headers: this.headers })
  								.pipe(map(res=>{
  									return res as Object;
  								}))
  	
  }

  getFollowed(id, page):Observable<any>{
    let url = `${this.url}/followed/${id}/${page}`;

    return this.http
                  .get( url, { headers: this.headers })
                  .pipe(map(res=>{
                    return res as Object;
                  }))
  }

  getFollowing(id, page):Observable<any>{
    let url = `${this.url}/following/${id}/${page}`;

    return this.http
                  .get( url, { headers: this.headers })
                  .pipe(map(res=>{
                    return res as Object;
                  }))
  }

}
