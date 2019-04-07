import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.models';
import { Follow } from '../../models/follow.models';
import { UserService } from '../../providers/user.service';
import { FollowService } from '../../providers/follow.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styles: []
})
export class FollowingComponent implements OnInit, OnChanges {

  public title:string;
  public identity:Object;
  public page:number;
  public nextPage:number;
  public prevPage:number;
  public total:number;
  public pages:number = 0;
  public UsersFollowing:Follow[];
  public follows;
  public requested;
  public request;
  public friends;
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
                this.requested = res.user_requested;
                this.friends = res.friends;
                this.request = res.friends_request;

                if ( this.total!= 0 && this.page > this.pages) {
                  this._router.navigateByUrl(`/following/${userId}/1`);
                }
              }
            }, err=>{
              console.log(err);
            })
  }
}
