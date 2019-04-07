import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.models';
import { UserService } from '../../providers/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
	public title:string;
	public user:User;
	public form:FormGroup;
  public success:boolean = false;
  public status:boolean = false;
  public message:string;

  constructor(
  						private _route:ActivatedRoute,
							private _router:Router,
              private _us: UserService,
  	) {


  	this.title = 'Iniciar sesión!'

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
  		)

  	});

  	this.form.valueChanges.subscribe(()=> this.updateUser());

  }

  ngOnInit() {
  }

  updateUser(){
  	let form = this.form.value;

  	this.user.email = form.email;
  	this.user.password = form.password;
  }

  login(){
    this._us.login(this.user)
              .subscribe(res=>{
                this.success = res['success'];
                this.status = true;
                this.message = res['message'];
                if (this.success) {
                  this.getCounter();
                  // this._router.navigateByUrl('home');
                }
              }, err=> {
                if (err.error.err) {
                  this.success = err.error.err.success;
                  this.message = err.error.err.message
                } else{
                  this.success = err.error.success;
                  this.message = err.error.message;
                }
                this.status = true;
              });
  }

  getCounter(){
    this._us.getCounters()
              .subscribe(res=>{
                this.success = res['success'];
                this.status = true;
                if (this.success){
                  this._us.setStats(res.gc);
                  this._router.navigateByUrl('/home');
                };
              }, err=> {
                if (err.error.err) {
                  this.success = err.error.err.success;
                  this.message = err.error.err.message
                } else{
                  this.success = err.error.success;
                  this.message = err.error.message;
                }
                this.status = true;
              })
  }

}
