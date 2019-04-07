import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.models';
import { Follow } from '../../models/follow.models';
import { UserService } from '../../providers/user.service';
import { FollowService } from '../../providers/follow.service';
import { FriendService } from '../../providers/friend.service';

@Component({
  selector: 'app-request-friends',
  templateUrl: './request-friends.component.html',
  styles: []
})
export class RequestFriendsComponent implements OnInit {

  public title:string;
  public identity:Object;
  public page:number;
  public nextPage:number;
  public prevPage:number;
  public total:number;
  public pages:number = 0;
  public UsersFollowing:Follow[];
  public RequestFriends;
  public user:number;
  public follows;
  public stats;
  public friends;
  public requested;
  public request;

  constructor(
                private _us:UserService,
                private _fs:FollowService,
                private _rfs:FriendService,
                private _route:ActivatedRoute,
                private _router:Router
              ) {
    this.title = 'Solicitudes de amistad';
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
      this.page = page;

      this.nextPage = page + 1;
      this.prevPage = page - 1;

      if (this.prevPage <= 0) {
        this.prevPage = 1;
      }

      this.getRequestFriends(page);
    })
  }

  getRequestFriends(page){
    this._rfs.getRequestF(page)
            .subscribe(res=>{
              console.log(res)
              if (res['success']) {
                this.total = res['total'];
                this.pages = res['pages'];
                this.friends = res['friends'];
                this.RequestFriends = res['requests'];
                this.requested = res['user_requested'];
                this.follows = res['users_following'];
                this.request = res['friends_request'];

                if ( this.total!= 0 && this.page > this.pages) {
                  this._router.navigateByUrl(`/home`);
                }
              }
            }, err=>{
              console.log(err);
            })
  }
}
