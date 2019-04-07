import { Pipe, PipeTransform } from '@angular/core';
import { GlobalService } from '../providers/global.service';

@Pipe({
  name: 'secureImage'
})
export class SecureImagePipe implements PipeTransform {

	constructor(private _gs:GlobalService ){}

  transform(object: any, type: string): any {

    if (type === 'avatar') {
    	if (object.image) {   
	    	return `${this._gs.url}/user/image/${object.image}`;
	    } else {
	      return `assets/user.png`;
	    }
    }

    if (type === 'fileP') {
    	return `${this._gs.url}/publication/image/${object.file}`;
    }
  }
}
