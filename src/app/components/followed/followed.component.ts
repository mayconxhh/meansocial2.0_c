import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.models';
import { Follow } from '../../models/follow.models';
import { UserService } from '../../providers/user.service';
import { FollowService } from '../../providers/follow.service';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styles: []
})
export class FollowedComponent implements OnInit {

  public title:string;
  public identity:Object;
  public page:number;
  public nextPage:number;
  public prevPage:number;
  public total:number;
  public pages:number = 0;
  public UsersFollowed:Follow[];
  public follows;
  public requests;
  public friends;
  public user:number;
  public stats;

  constructor(
                private _us:UserService,
                private _fs:FollowService,
                private _route:ActivatedRoute,
                private _router:Router
              ) {
    this.title = 'Usuario seguidos por';
    this.identity = this._us.getIdentity();
    this.stats = this._us.getStats();
  }

  ngOnInit() {
    this.currentPage();
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
    this._fs.getFollowed(userId, page)
            .subscribe(res=>{
              console.log(res);
              if (res.success) {
                this.total = res.total;
                this.pages = res.pages;
                this.UsersFollowed = res.follows;
                this.follows = res.users_following;
                this.requests = res.user_solicited;
                this.friends = res.friends;

                if (this.total!= 0 &&  this.page > this.pages) {
                  this._router.navigateByUrl(`/followed/${userId}/1`);
                }
              }
            }, err=>{
              console.log(err);
            })
  }

}
