import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
	public url:string = 'http://localhost:5000/api';

  constructor() { }
}
