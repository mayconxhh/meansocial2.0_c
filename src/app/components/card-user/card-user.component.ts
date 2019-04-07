import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.models';
import { Follow } from '../../models/follow.models';
import { FriendRequest } from '../../models/friendRequest.models';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../providers/user.service';
import { FollowService } from '../../providers/follow.service';
import { FriendService } from '../../providers/friend.service';

import {
          faPlusCircle,
          faMinusCircle,
          faCheckCircle
        } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styles: []
})
export class CardUserComponent implements OnInit {

  @Input() users;
  public usersClean = [];
  public faPlusCircle = faPlusCircle;
  public faMinusCircle = faMinusCircle;
  public faCheckCircle = faCheckCircle;
  public identity:Object;
  @Input() follows;
  @Input() request;
  @Input() friends;
  public followUserOver;
  public followUserOverBF
  public followUserOverCard;
  public followUserOverCardRP;
  public followUserOverCardF;
  @Input() user:number;
  @Input() stats;
  @Input() requested;


  constructor(
                private _us:UserService,
                private _fs:FollowService,
                private _fds:FriendService,
                private _route:ActivatedRoute,
                private _router:Router
              ) {
    this.identity = this._us.getIdentity();
    this.stats = this._us.getStats();
  }

  ngOnInit() {
    
    for (let user of this.users) {
      if (typeof user.user != 'string') {
        this.usersClean.push(user.user);
      } else if(typeof user.followed != 'string') {
        this.usersClean.push(user.followed);
      }
    }

    console.log(this.usersClean)
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

  mouseEnterBF(userId){
    this.followUserOverBF = userId;
  }

  mouseLeaveBF(userId){
    this.followUserOverBF = 0;
  }

  mouseEnterRP(userId){
    this.followUserOverCardRP = userId;
  }

  mouseLeaveRP(userId){
    this.followUserOverCardRP = 0;
  }

  mouseEnterF(userId){
    this.followUserOverCardF = userId;
  }

  mouseLeaveF(userId){
    this.followUserOverCardF = 0;
  }

  sendRequest(userId){
    let request = new FriendRequest('', this.identity['_id'], userId)
    this._fds.sendRequestF(request)
                .subscribe(res=>{
                  console.log(res)
                  if (res['success']) {
                    this.requested.push(res['fRequest'].requested)
                    // this.stats.following +=1;
                    // this._us.setStats(this.stats);
                  }
                }, err=>{
                  console.log(err)
                })
  }

  cancelRequest(requested){
    this._fds.cancelRequest(requested)
                .subscribe(res=>{
                  console.log(res);
                  if (res.success) {
                    let i = this.requested.indexOf(requested);

                    if (i != -1) {
                      // this.stats.following -=1;
                      // this._us.setStats(this.stats);
                      this.requested.splice(i, 1);
                    }
                  }
                }, err=>{
                  console.log(err)
                })
  }

  addFriend(userId){
    this._fds.addFriend(userId)
                .subscribe(res=>{
                  console.log(res)
                  if (res['success']) {
                    this.friends.push(res['friend'].friend)
                    let i = this.request.indexOf(userId)
                    // this.stats.following +=1;
                    // this._us.setStats(this.stats);
                    if (i != -1) {
                      // this.stats.following -=1;
                      // this._us.setStats(this.stats);
                      this.request.splice(i, 1);
                    }
                  }
                }, err=>{
                  console.log(err)
                })
  }

  deleteFriend(userId){
    this._fds.deleteFriend(userId)
                .subscribe(res=>{
                  console.log(res);
                  if (res.success) {
                    let i = this.friends.indexOf(userId);

                    if (i != -1) {
                      // this.stats.following -=1;
                      // this._us.setStats(this.stats);
                      this.friends.splice(i, 1);
                    }
                  }
                }, err=>{
                  console.log(err)
                })
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
