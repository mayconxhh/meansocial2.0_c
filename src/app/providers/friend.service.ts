import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Follow } from '../models/follow.models';
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class FriendService {

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

  sendRequestF(friend){
    let params = JSON.stringify(friend);
    let url = `${this.url}/friend_request`;

    return this.http
                  .post( url, params, { headers: this.headers })
                  .pipe(map(res=>{
                    return res as Object;
                  }))
  }

  cancelRequest(id):Observable<any>{

    let url = `${this.url}/friend_request/${id}`;

    return this.http
                  .delete( url, { headers: this.headers })
                  .pipe(map(res=>{
                    return res as Object;
                  }))
    
  }

  getRequestF(page){
    let url = `${this.url}/friend_request/${page}`;

    return this.http
                  .get( url, { headers: this.headers })
                  .pipe(map(res=>{
                    return res as Object;
                  }))
  }

  getFriends(userId, page):Observable<any>{

    let url = `${this.url}/friends/${userId}/${page}`;

    return this.http
                  .get( url, { headers: this.headers })
                  .pipe(map(res=>{
                    return res as Object;
                  }))

  }

  addFriend(friend){
    console.log(friend)
    let params = JSON.stringify(friend);
    let url = `${this.url}/friend/${friend}`;

    return this.http
                  .post( url, { headers: this.headers })
                  .pipe(map(res=>{
                    return res as Object;
                  }))
  }

  deleteFriend(id):Observable<any>{

    let url = `${this.url}/friend/${id}`;

    return this.http
                  .delete( url, { headers: this.headers })
                  .pipe(map(res=>{
                    return res as Object;
                  }))
    
  }


}
