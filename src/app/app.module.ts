import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { FriendsComponent } from './components/friends/friends.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { TeamsComponent } from './components/teams/teams.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GraphQLModule } from './graphql.module';
import { NamesfilterPipe } from './pipes/namesfilter.pipe';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FisrtImagesPipe } from './pipes/fisrt-images.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from './components/post/post.component';
import { AddCommentsComponent } from './components/add-comments/add-comments.component';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { TrainerComponent } from './components/trainer/trainer.component';
import { TrainerSwitchingComponent } from './components/trainer-switching/trainer-switching.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ChatComponent } from './components/chat/chat.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { TeamPostComponent } from './components/team-post/team-post.component';
import { TeamComponent } from './components/team/team.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponent,
    SignUpComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    MyPageComponent,
    AboutUsComponent,
    ContactUsComponent,
    WorkoutsComponent,
    FriendsComponent,
    TrainersComponent,
    TeamsComponent,
    MainComponent,
    NotFoundComponent,
    NamesfilterPipe,
    MyProfileComponent,
    EditProfileComponent,
    FisrtImagesPipe,
    PostComponent,
    AddCommentsComponent,
    TrainerComponent,
    TrainerSwitchingComponent,
    ChatComponent,
    ExercisesComponent,
    TeamPostComponent,
    TeamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule,
    NgbModule,
    PickerModule,
    NgxSpinnerModule,
    NgxEmojiPickerModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
     {
         provide: APOLLO_OPTIONS,
         useFactory: (httpLink: HttpLink) => {
           return {
            cache: new InMemoryCache(),
            link: httpLink.create({
            uri: ' http://localhost:4000/',
            }),
           };
          },
         deps: [HttpLink],
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }
