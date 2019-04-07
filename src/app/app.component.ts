import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './providers/user.service';

// import * as $ from 'jquery';
// import * as jQuery from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  public title:string = 'SocialMean';
  public identity:Object;
  public stats;


  constructor( private _us:UserService ){}

  ngOnInit(){
  	this.identity = this._us.getIdentity();
    this.stats = this._us.getStats();
  }

  ngDoCheck(){
  	this.identity = this._us.getIdentity();
    this.stats = this._us.getStats();
  }
}
