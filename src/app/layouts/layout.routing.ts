import { Routes } from '@angular/router';

import { AuthGuard } from '../helpers/auth.guard';

import { LoginComponent } from '../pages/login/login.component';
import { UserComponent } from '../pages/user/user.component';

export const LayoutRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
];
