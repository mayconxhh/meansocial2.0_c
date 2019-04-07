import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.models';
import { UserService } from '../../providers/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
	public title:string;
	public user:User;
	public form:FormGroup;
  public success:boolean = false;
  public status:boolean = false;
  public message:string;

  constructor( private _route:ActivatedRoute,
  							private _router:Router,
                private _us: UserService
  						) {

  	this.title = 'Registrate!'

  	this.user = new User("",
  			"",
  			"",
  			"",
  			"",
  			"",
  			"",
  			""
  		);

  	this.form = new FormGroup({

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
  		'password': new FormControl(
  			'',
  			[
  				Validators.required,
  				Validators.minLength(5)
  			]
  		),
  		'confirmPassword': new FormControl(),
  		'role': new FormControl('ROLE_USER'),

  	});

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
  	this.user.password = form.password;
  	this.user.role = form.role;
  }

  register(){
  	this._us.register(this.user)
          .subscribe(res=>{
            console.log(res);
            this.success = res.success;
            this.status = true;
            this.message = res.message;
            if (this.success) this.form.reset();
          }, err=>{
            this.success = err.error.err.success;
            this.status = true;
            this.message = err.error.err.message; 
          });
  }

}
