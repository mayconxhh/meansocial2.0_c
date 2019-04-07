import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publication } from '../models/publication.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
	public publication:Publication;
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

  newPublication(publication:Publication):Observable<any>{
  	let params = JSON.stringify(publication);
  	let url = `${this.url}/publication`;

  	return this.http
  									.post( url, params, { headers: this.headers })
  									.pipe(map(res=>{
  										return res as Object;
  									}))
  }

  getPublications(page = 1):Observable<any>{
    let url = `${this.url}/publications/${page}`;

    return this.http
            .get(url, { headers: this.headers })
            .pipe(map(res=>{
              return res as Object;
            }));
  }

  deletePublication(id):Observable<any>{
    let url = `${this.url}/publication/${id}`;

    return this.http
                  .delete(url, { headers: this.headers })
                  .pipe(map(res=>{
                    return res as Object;
                  }));
  }

  getPublicationsUser(userId, page = 1):Observable<any>{
    let url = `${this.url}/publications-user/${userId}/${page}`;

    return this.http
            .get(url, { headers: this.headers })
            .pipe(map(res=>{
              return res as Object;
            }));
  }

  getPublication(idPublication):Observable<any>{
    let url = `${this.url}/publication/${idPublication}`;

    return this.http
            .get(url, { headers: this.headers })
            .pipe(map(res=>{
              return res as Object;
            }));
  }
}
