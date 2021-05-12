import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FriendsComponent } from './components/friends/friends.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path:'login' ,component:LoginComponent},

  { path:'' ,component:HomeComponent},
  { path:'main' ,component:MainComponent},
  { path:'profile' ,component:ProfileComponent,children: [
       { path:'edit' ,component:EditProfileComponent},
       { path:'myProfile' ,component:MyProfileComponent},
       { path: '', redirectTo: 'myProfile', pathMatch: 'full'}
      ]
  },
  { path:'signUp' ,component:SignUpComponent},
  { path:'teams' ,component:TeamsComponent},
  { path:'trainers' ,component:TrainersComponent},
  { path:'workouts' ,component:WorkoutsComponent},
  { path:'aboutUs' ,component:AboutUsComponent,pathMatch: 'full'},
  { path:'contactUs' ,component:ContactUsComponent},
  { path:'friends' ,component:FriendsComponent},
  { path:'myPage' ,component:MyPageComponent},
  { path:'workout' ,component:WorkoutComponent},
  { path:'workouts' ,component:WorkoutsComponent},
  { path:'trainer' ,component:TrainersComponent},
  { path:'exercises' ,component:ExercisesComponent},
  { path:'chat' ,component:ChatComponent},
  { path:'notFound' ,component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
