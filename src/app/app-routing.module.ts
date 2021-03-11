import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowingPageComponent } from './following-page/following-page.component';
import { RegisterComponent } from './register/register.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WriteBlogComponent } from './write-blog/write-blog.component';

const routes: Routes = [

{path:'login',component:UserLoginComponent},
{path:'Register',component:RegisterComponent},
{path:'home',component:UserHomeComponent},
{path:'FollowingProfile',component:FollowingPageComponent},
{path:'UserProfile',component:UserProfileComponent},
{path:'createBlog',component:WriteBlogComponent},
{path: 'd', redirectTo: '/UserProfile', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
