import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.models';
import { Follow } from '../../models/follow.models';
import { UserService } from '../../providers/user.service';
import { FollowService } from '../../providers/follow.service';

import {
          faPlusCircle,
          faMinusCircle,
          faCheckCircle
        } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styles: []
})
export class FollowingComponent implements OnInit, OnChanges {

  public faPlusCircle = faPlusCircle;
  public faMinusCircle = faMinusCircle;
  public faCheckCircle = faCheckCircle;
  public title:string;
  public identity:Object;
  public page:number;
  public nextPage:number;
  public prevPage:number;
  public total:number;
  public pages:number = 0;
  public UsersFollowing:Follow[];
  public follows;
  public followingUserOver;
  public followingUserOverCard;
  public user:number;
  public stats;

  constructor(
                private _us:UserService,
                private _fs:FollowService,
                private _route:ActivatedRoute,
                private _router:Router
              ) {
    this.title = 'Personas que sigue';
    this.identity = this._us.getIdentity();
    this.stats = this._us.getStats();
    this.currentPage();
  }

  ngOnInit() {
  }

  ngOnChanges(){
    this.UsersFollowing = []
  }

  currentPage(){
    this._route.params.subscribe( params=>{
      let page = params['page'] ? parseInt(params['page']) : 1;
      let userId = params['id'];
      this.user = userId;
      this.page = page;

      this.nextPage = page + 1;
      this.prevPage = page - 1;

      if (this.prevPage <= 0) {
        this.prevPage = 1;
      }

      this.getFollows(userId, page);
    })
  }

  getFollows(userId, page){
    this._fs.getFollowing(userId, page)
            .subscribe(res=>{
              console.log(res);
              if (res.success) {
                this.total = res.total;
                this.pages = res.pages;
                this.UsersFollowing = res.follows;
                this.follows = res.users_following;

                if ( this.total!= 0 && this.page > this.pages) {
                  this._router.navigateByUrl(`/following/${userId}/1`);
                }
              }
            }, err=>{
              console.log(err);
            })
  }

  mouseEnterCard(userId){
    this.followingUserOverCard = userId;
  }

  mouseLeaveCard(userId){
    this.followingUserOverCard = 0;
  }

  mouseEnter(userId){
    this.followingUserOver = userId;
  }

  mouseLeave(userId){
    this.followingUserOver = 0;
  }

  followUser(followed){
    let follow = new Follow('', this.identity['_id'], followed);

    this._fs.addFollow(follow)
                .subscribe(res=>{
                  console.log(res)
                  if (res.success) {
                    this.follows.push(res.follow.followed)
                    this.stats.following +=1;
                    this._us.setStats(this.stats);
                  }
                }, err=>{
                  console.log(err)
                })
  }

  unfollowUser(followed){
    this._fs.deleteFollow(followed)
                .subscribe(res=>{
                  console.log(res);
                  if (res.success) {
                    let i = this.follows.indexOf(followed);

                    if (i != -1) {
                      this.stats.following -=1;
                      this._us.setStats(this.stats);
                      this.follows.splice(i, 1);
                    }
                  }
                }, err=>{
                  console.log(err)
                })
  }

}
