import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../providers/user.service';
import { PublicationService } from '../../providers/publication.service';
import { Publication } from '../../models/publication.models';
import { UploadService } from '../../providers/upload.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
	public identity;
	// public stats;
	public publication:Publication;
	public form:FormGroup;
	public filesToUpload:Array<File>
	public textInputFile:string = 'Subir imagen...'
  @Output() sended = new EventEmitter();
  @Input() public stats;

  constructor(
  	private _us:UserService,
  	private _ps:PublicationService,
  	private _ups:UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

  	this.identity = this._us.getIdentity();
  	this.stats = this._us.getStats();
  	this.publication = new Publication( '', '', '', '', '' )

  	this.form = new FormGroup({
			'text': new FormControl(
				'',
				[
					Validators.required,
					Validators.minLength(3)
				]
			),
			'file': new FormControl(),
			'createdAd': new FormControl(),
			'user': new FormControl(this.identity._id)
  	})

  	this.form.valueChanges.subscribe(()=> this.updatePublication());

  }

  ngOnInit() {
  }

  updatePublication(){
  	let form = this.form.value;
  	this.publication.text = form.text;
  	this.publication.user = form.user;
  }

  newPublication(){
  	this._ps.newPublication(this.publication)
  						.subscribe(res=>{
  							console.log(res);
  							if (res.success) {
  								if (this.filesToUpload && this.filesToUpload.length >=1 ) {
  									this._ups.makeFileRequest(`publication/upload_image/${res.publication._id}`, [], this.filesToUpload, 'file')
  											.then(res=>{
  												if (res['success']) {
					  								this.form.reset();
  													this.textInputFile = 'Subir imagen...';
                            this._router.navigateByUrl('/home');
                            this.stats.publications +=1;
                            this._us.setStats(this.stats);
                            this.sendedPublication();
  												}
  											}, err=>{
  												console.log(err)
  											})
  								} else {
                    this.form.reset();
                    this.sendedPublication();
                    this.stats.publications +=1;
                    this._us.setStats(this.stats);
  								}
  							}
  						}, err=>{
  							console.log(err);
  						})
  }

  fileChange(file:any){
    this.filesToUpload = <Array<File>>file.target.files;
    if (this.filesToUpload.length>=1) {
      this.textInputFile = this.filesToUpload[0].name;
    } else {
      this.textInputFile = 'Subir imagen...';
    }
  }

  sendedPublication(){
    this.sended.emit({ send:true });
  }

}
