import 'moment/locale/es';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { APP_ROUTING } from './app.route';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { UserService } from './providers/user.service';
import { PublicationService } from './providers/publication.service';
import { FollowService } from './providers/follow.service';
import { AuthService } from './providers/auth.service';
import { AuthenticatedService } from './interceptors/authenticated.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/userEdit/edit.component';
import { SecureImagePipe } from './pipes/secure-image.pipe';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PublicationComponent } from './components/publication/publication.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OptionPublicationComponent } from './components/option-publication/option-publication.component';
import { FollowedComponent } from './components/followed/followed.component';
import { FollowingComponent } from './components/following/following.component';
import { FriendsComponent } from './components/friends/friends.component';
import { RequestFriendsComponent } from './components/request-friends/request-friends.component';
import { CardUserComponent } from './components/card-user/card-user.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EditComponent,
    SecureImagePipe,
    UsersComponent,
    SidebarComponent,
    PublicationComponent,
    ProfileComponent,
    OptionPublicationComponent,
    FollowedComponent,
    FollowingComponent,
    FriendsComponent,
    RequestFriendsComponent,
    CardUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    MomentModule,
    APP_ROUTING
  ],
  providers: [
    UserService,
    FollowService,
    PublicationService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticatedService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
