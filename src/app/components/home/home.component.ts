import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { UserService } from '../../providers/user.service';
import { PublicationService } from '../../providers/publication.service';
import { Publication } from '../../models/publication.models';

import { 
          faSyncAlt
        } from '@fortawesome/free-solid-svg-icons';

import * as $ from 'jquery';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
	public title:string;
	public publications:Array<Publication>
	public pages:number;
	public total:number;
	public itemsForPage:number;
	public noMore:boolean = false;
	public page:number;
  public faSyncAlt = faSyncAlt;

  constructor( private _ps:PublicationService,
  							private _router:Router
  						) {

  	this.title = 'Timeline';
  	this.page = 1;

  }

  ngOnInit(){
  	this.getPublications(this.page);
  }

  getPublications( page , adding = false){

  	this._ps.getPublications(page)
  							.subscribe(res=>{
  								if (res.success) {
  									this.total = res.total_items;
  									this.pages = res.pages;
  									this.itemsForPage = res.itemsForPage;

  									if (!adding) {
	  									this.publications = res.publications;
  									} else {
  										let arrayA = this.publications;
  										let arrayB = res.publications
  										this.publications = arrayA.concat(arrayB);
  										// $('html, body').animate({ scrollTop: $('body').prop('scrollHeight') }, 500);
  									}

                    console.log(this.publications);

  									if (page > this.pages ) {
  										console.log('entro :D')
  										this._router.navigateByUrl('/home');
  									}

  								}
  							}, err=>{
  								console.log(err)
  							})

  }

  viewMore(){
  	if (this.publications.length == this.total) {
  		this.noMore = true;
  	} else {
  		this.page+=1;
  	}

  	this.getPublications(this.page, true);

  }

  refresPublications(){
    this.getPublications(1);
  }

}
