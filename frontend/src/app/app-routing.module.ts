import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { ListPostComponent } from './post/list-post/list-post.component';
import { SavePostComponent } from './post/save-post/save-post.component';

import { AuthGuard } from "./guard/auth.guard";
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path:'listUser',
    component: ListUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'listRole',
    component: ListRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'registerRole',
    component: RegisterRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'registerUser',
    component: RegisterUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'updateUser',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'signUp',
    component: RegisterComponent,
  },
  {
    path:'listPost',
    component: ListPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'savePost',
    component: SavePostComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
