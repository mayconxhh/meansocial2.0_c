import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

import { faHome,
          faThList,
          faUsers,
          faSignInAlt,
          faUserPlus,
          faUser
        } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  @Input() title:string;
	@Input() identity:Object;

	faHome = faHome;
	faThList = faThList;
	faUsers = faUsers;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faUser = faUser;

  constructor( public _as:AuthService ) {}

  ngOnInit() {
  }

}
