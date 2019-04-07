import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.models';
import { Follow } from '../../models/follow.models';
import { FriendRequest } from '../../models/friendRequest.models';
import { UserService } from '../../providers/user.service';
import { FollowService } from '../../providers/follow.service';
import { FriendService } from '../../providers/friend.service';

import {
          faPlusCircle,
          faMinusCircle,
          faCheckCircle
        } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  public faPlusCircle = faPlusCircle;
  public faMinusCircle = faMinusCircle;
  public faCheckCircle = faCheckCircle;
  public title:string;
  public identity:Object;
  public page:number;
  public nextPage:number;
  public prevPage:number;
  public total:number;
  public pages:number;
  public users:User[];
  public follows;
  public followUserOver;
  public followUserOverCard;
  public stats;

  constructor(
                private _us:UserService,
                private _fs:FollowService,
                private _frs:FriendService,
                private _route:ActivatedRoute,
                private _router:Router
              ) {
    this.title = 'Nuestra Comunidad';
    this.identity = this._us.getIdentity();
    this.stats = this._us.getStats();
  }

  ngOnInit() {
    this.currentPage();
  }

  currentPage(){
    this._route.params.subscribe( params=>{
      let page = params['page'] ? parseInt(params['page']) : 1;
      this.page = page;

      this.nextPage = page + 1;
      this.prevPage = page - 1;

      if (this.prevPage <= 0) {
        this.prevPage = 1;
      }

      this.getUsers(page);
    })
  }

  getUsers(page){
    this._us.getUsers(page)
            .subscribe(res=>{
              console.log(res);
              if (res.success) {
                this.total = res.total;
                this.pages = res.pages;
                this.users = res.users;
                this.follows = res.users_following;

                if (this.page > this.pages) {
                  this._router.navigateByUrl('users/1');
                }
              }
            }, err=>{
              console.log(err);
            })
  }

  mouseEnterCard(userId){
    this.followUserOverCard = userId;
  }

  mouseLeaveCard(userId){
    this.followUserOverCard = 0;
  }

  mouseEnter(userId){
    this.followUserOver = userId;
  }

  mouseLeave(userId){
    this.followUserOver = 0;
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

  sendRequestF(friend){
    let request = new FriendRequest('', this.identity['_id'], friend);

    this._frs.sendRequestF(request)
                .subscribe(res=>{
                  console.log(res)
                  // if (res.success) {
                    // this.follows.push(res.follow.followed)
                    // this.stats.following +=1;
                    // this._us.setStats(this.stats);
                  // }
                }, err=>{
                  console.log(err)
                })
  }

}
