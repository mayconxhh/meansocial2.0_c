import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.models';
import { Follow } from '../../models/follow.models';
// import {} from '../../models/publication.models';
import { UserService } from '../../providers/user.service';
import { FollowService } from '../../providers/follow.service';

import {
					faPlusCircle,
					faMinusCircle,
					faCheckCircle,
          faUserEdit
        } from '@fortawesome/free-solid-svg-icons';

import * as $ from 'jquery';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

	public faPlusCircle = faPlusCircle;
	public faMinusCircle = faMinusCircle;
	public faCheckCircle = faCheckCircle;
  public faUserEdit = faUserEdit;

	public title:String;
	public user:User;
	public identity;
	public stats;
	public followed:boolean;
	public following:boolean;
	public userId;
	public followUserOver:number;
  public statsIdentity;

  constructor(
  						private _us:UserService,
  						private _fs:FollowService,
  						private _route:ActivatedRoute,
  						private _router:Router
  					) {

  	this.title = 'Perfil';
  	this.identity = this._us.getIdentity();
  	this.followed = false;
  	this.following = false;
    this.statsIdentity = this._us.getStats();
  
  }

  ngOnInit() {
  	this.loadPage();
    $('html, body').animate({ scrollBottom: $('body').prop('scrollHeight') }, 500);
  }

  loadPage(){
  	this._route.params.subscribe(params=>{
  		let id = params['id'];
  		this.getUser(id);
  		this.getCounters(id);
  	})
  }

  getUser(userId){
  	this._us.getUser(userId)
  						.subscribe(res=>{
  							console.log(res);
  							if (res.success) {
  								this.user = res.user;
  								if (res.fl.following && res.fl.following._id) {
  									this.following = true;
  								} else {
  									this.following = false;
  								}

  								if (res.fl.followed && res.fl.followed._id) {
  									this.followed = true;
  								} else {
  									this.followed = false;
  								}
  							}
  						}, err=>{
  							console.log(err);
  							this._router.navigateByUrl('/profile/'+this.identity._id);
  						})
  }

  getCounters(userId){
  	this._us.getCounters(userId)
  							.subscribe(res=>{
  								console.log(res);
  								if (res.success) {
  									this.stats = res.val;
  								}
  							}, err=>{
  								console.log(err);
  							});
  }

  folloUser(userId){
  	let follow = new Follow('', this.identity._id, userId);
  	this._fs.addFollow(follow)
  						.subscribe(res=>{
  							console.log(res)
  							if (res.success) {
  								this.following = true;
                  this.statsIdentity.following +=1;
                  this._us.setStats(this.statsIdentity);
  							}
  						}, err=>{
  							console.log(err)
  						})
  }

  unfolloUser(userId){
  	this._fs.deleteFollow(userId)
  						.subscribe(res=>{
  							console.log(res)
  							if (res.success) {
  								this.following = false;
                  this.statsIdentity.following -=1;
                  this._us.setStats(this.statsIdentity);
  							}
  						}, err=>{
  							console.log(err)
  						})
  }

  mouseEnter(userId){
  	this.followUserOver = userId;
  }

  mouseLeave(userId){
  	this.followUserOver = 0;
  }

}
