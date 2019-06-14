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
	    	return `${object.image}`;
	    } else {
	      return `assets/user.png`;
	    }
    }

    if (type === 'fileP') {
    	return `${object.file}`;
    }
  }
}
