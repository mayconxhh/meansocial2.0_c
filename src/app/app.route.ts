import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/userEdit/edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { OptionPublicationComponent } from './components/option-publication/option-publication.component';
import { FollowedComponent } from './components/followed/followed.component';
import { FollowingComponent } from './components/following/following.component';
import { RequestFriendsComponent } from './components/request-friends/request-friends.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const app_routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [ NoAuthGuard ]
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [ NoAuthGuard ]
	},
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'profile/:id',
		component: ProfileComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'edit/profile',
		component: EditComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'users',
		component: UsersComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'users/:page',
		component: UsersComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'publication/:id',
		component: OptionPublicationComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'followed/:id',
		component: FollowedComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'followed/:id/:page',
		component: FollowedComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'following/:id',
		component: FollowingComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'following/:id/:page',
		component: FollowingComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'request_friends',
		component: RequestFriendsComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'request_friends/:page',
		component: RequestFriendsComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: 'home'
	}
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);