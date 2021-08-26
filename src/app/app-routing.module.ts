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
import { AuthGuard } from './services/auth-guard.service';
import { AthleteProfileComponent } from './components/athlete-profile/athlete-profile.component';
import { TeamComponent } from './components/team/team.component';
import { ProfilePostsComponent } from './components/profile-posts/profile-posts.component';
import { ProfileWorkoutsComponent } from './components/profile-workouts/profile-workouts.component';
import { TeamPostComponent } from './components/team-post/team-post.component';
import { TeamWorkoutsComponent } from './components/team-workouts/team-workouts.component';
import { TeamPostsComponent } from './components/team-posts/team-posts.component';
import { TeamWorkoutComponent } from './components/team-workout/team-workout.component';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { InjuryComponent } from './components/injury/injury.component';
import { PostComponent } from './components/post/post.component';
import { PostViewComponent } from './components/post-view/post-view.component';

const routes: Routes = [
  { path:'injury' ,component:InjuryComponent},

  { path:'login' ,component:LoginComponent},

  { path:'' ,component:HomeComponent, canActivate:[AuthGuard]},
  { path:'main' ,component:MainComponent},
  { path:'profile' ,component:ProfileComponent, canActivate:[AuthGuard], children: [
       { path:'edit' ,component:EditProfileComponent, canActivateChild:[AuthGuard]},
       { path:'myProfile' ,component:MyProfileComponent, canActivateChild:[AuthGuard]},
       { path: '', redirectTo: 'myProfile', pathMatch: 'full', canActivateChild:[AuthGuard]}
      ]
  },
  { path:'athlete/:id' ,component: AthleteProfileComponent},
  { path:'athlete/:id/posts' ,component: ProfilePostsComponent},
  { path:'athlete/:id/workouts' ,component: ProfileWorkoutsComponent},
  { path:'signup' ,component:SignUpComponent},
  { path:'teams' ,component:TeamsComponent, canActivate:[AuthGuard]},
  { path:'team/:id' ,component:TeamComponent, canActivate:[AuthGuard]},
  { path:'team/:id/posts' ,component: TeamPostsComponent, canActivate:[AuthGuard]},
  { path:'team/:id/workouts' ,component: TeamWorkoutsComponent, canActivate:[AuthGuard]},
  { path:'team/:id/members' ,component: TeamMembersComponent, canActivate:[AuthGuard]},
  { path:'trainers' ,component:TrainersComponent, canActivate:[AuthGuard]},
  { path:'workouts' ,component:WorkoutsComponent, canActivate:[AuthGuard]},
  { path:'aboutUs' ,component:AboutUsComponent,pathMatch: 'full'},
  { path:'contactUs' ,component:ContactUsComponent},
  { path:'friends' ,component:FriendsComponent, canActivate:[AuthGuard]},
  { path:'myPage' ,component:MyPageComponent, canActivate:[AuthGuard]},
  { path:'workout/:id' ,component:WorkoutComponent, canActivate:[AuthGuard]},
  { path:'team/workout/:id' ,component:TeamWorkoutComponent, canActivate:[AuthGuard]},
  { path:'workouts' ,component:WorkoutsComponent, canActivate:[AuthGuard]},
  { path:'trainer' ,component:TrainersComponent, canActivate:[AuthGuard]},
  { path:'exercises' ,component:ExercisesComponent, canActivate:[AuthGuard]},
  { path:'chat' ,component:ChatComponent, canActivate:[AuthGuard]},

  { path:'post/:id', component:PostViewComponent},  

  { path:'**' ,component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
