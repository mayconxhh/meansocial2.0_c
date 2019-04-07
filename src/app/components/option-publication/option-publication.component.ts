import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../providers/user.service';
import { PublicationService } from '../../providers/publication.service';
import { Publication } from '../../models/publication.models';

import { 
          faEllipsisH
        } from '@fortawesome/free-solid-svg-icons';

declare var $:any;

@Component({
  selector: 'app-option-publication',
  templateUrl: './option-publication.component.html',
  styles: []
})
export class OptionPublicationComponent implements OnInit {
  public publication:Publication;
  public identity;
  public faEllipsisH = faEllipsisH;
  public stats;

  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _us:UserService,
    private _ps:PublicationService
  ) {
    this.identity = this._us.getIdentity();
    this.stats = this._us.getStats();
  }

  ngOnInit() {
    this._route.params.subscribe(params=>{
      let idPublication = params['id'];
      this.getPublication(idPublication);
    })
  }

  getPublication(idPublication){
    this._ps.getPublication(idPublication)
                .subscribe(res=>{
                  console.log(res);
                  if (res.success) {
                    this.publication = res.publication;
                  }
                }, err=>{
                  console.log(err);
                })
  }

  deletePublication(publicationId){
    this._ps.deletePublication(publicationId)
                .subscribe(res=>{
                  console.log(res);
                  if (res.success) {
                    this.closeModal();
                    this._router.navigateByUrl('home');
                    this.stats.publications -=1;
                    this._us.setStats(this.stats);
                  }
                }, err=>{
                  console.log(err);
                })
  }

  closeModal(){
    $('#modalDanger').modal('hide')
  }

  openModal(){
    $('#modalDanger').modal('show')
  }

}
