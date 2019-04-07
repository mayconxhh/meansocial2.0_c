import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.models';
import { UserService } from '../../providers/user.service';
import { UploadService } from '../../providers/upload.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {

	public title:string;
	public user:any;
	public identity;
	public status:boolean;
	public form:FormGroup;
	public success:boolean;
	public message:string;
  public filesToUpload: Array<File>;
  public textInputFile:string = 'Sube una foto...';
  public changeView:boolean = false;

  constructor( private _us:UserService,
  							private _router:Router,
  							private _route:ActivatedRoute,
                private _ups:UploadService
  						) {

  	this.title = 'Actualizar mis datos';
  	this.user = this._us.getIdentity();
  	this.identity = this._us.getIdentity();

  	this.form = new FormGroup({
  		'_id': new FormControl(),
  		'image': new FormControl(),
  		'name': new FormControl(
  			'',
  			[
  				Validators.required,
  				Validators.minLength(3)
  			]
  		),
  		'lastname': new FormControl(
  			'',
  			[
  				Validators.required,
  				Validators.minLength(3)
  			]
  		),
  		'nick': new FormControl(
  			'',
  			[
  				Validators.required,
  				Validators.minLength(5)
  			]
  		),
  		'email': new FormControl(
  			'',
  			[
  				Validators.required,
  				Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
  			]
  		),
  		'role': new FormControl('ROLE_USER'),

  	});

  	this.form.setValue(this.user);

  	this.form.valueChanges.subscribe(()=> this.updateUser());
  }

  ngOnInit() {
  }

  updateUser(){
  	let form = this.form.value;

  	this.user.name = form.name;
  	this.user.lastname = form.lastname;
  	this.user.nick = form.nick;
  	this.user.email = form.email;
  	this.user.role = form.role;
  }

  editUser(){
  	this._us.updateUser(this.user)
  						.subscribe(res=>{
  							this.success = res.success;
                this.message = res.message;
                this.status = true;

                if (this.success) {
                  this._us.setIdentity(res.user);
                  this.identity = res.user;

                  if( this.filesToUpload && this.filesToUpload.length>=1 ){
                    this._ups.makeFileRequest(`upload_user_image/${this.identity._id}`, [], this.filesToUpload, 'image' )
                                .then((res:any)=>{
                                  console.log(res)
                                  if (res.success) {
                                    this.user.image = res.user.image;
                                    this._us.setIdentity(this.user);
                                    this.identity = res.user;
                                  } else {
                                    this.success = res.success;
                                    this.status = true;
                                    this.message = res.message; 
                                  }

                                }, err=>{
                                  let error = JSON.parse(err);
                                  this.success = error.success;
                                  this.status = true;
                                  this.message = error.message;
                                })
                  }

                }

  						}, err=>{
                console.log(err)
		            this.success = err.error.err.success || err.error.success;
		            this.status = true;
		            this.message = err.error.err.message || err.error.message; 
		          })
  }

  fileChange(file:any){
    this.filesToUpload = <Array<File>>file.target.files;
    if (this.filesToUpload.length>=1) {
      this.textInputFile = this.filesToUpload[0].name;
    } else {
      this.textInputFile = 'Sube una foto...';
    }
  }

  changeViewUser(){
    this.changeView = !this.changeView;
  }

}
