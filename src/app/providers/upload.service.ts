import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
	public url:string;

  constructor( private _gs:GlobalService,
 								private _as:AuthService ) {
  	this.url = this._gs.url;
  }

  makeFileRequest( url:string, params:Array<string>, files:Array<File>, name: string){
  	return new Promise((res, rej)=>{
  		let formData: any = new FormData();
  		let xhr = new XMLHttpRequest();

  		for(let file of files){
  			formData.append(name, file, file.name);
  		}

  		xhr.onreadystatechange = ()=>{
  			if (xhr.readyState == 4) {
  				if (xhr.status == 200) {
  					res(JSON.parse(xhr.response));
  				} else {
  					rej(xhr.response);
  				}
  			}
  		}

  		xhr.open('POST', `${this.url}/${url}`, true);
  		xhr.setRequestHeader('Authorization', this._as.getToken())
  		xhr.send(formData);
  	})
  }
}
