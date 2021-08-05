import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutRoutes } from './layout.routing';

import { LayoutComponent } from './layout.component';
import { LoginComponent } from '../pages/login/login.component';
import { UserComponent } from '../pages/user/user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [LayoutComponent, LoginComponent, UserComponent],
  providers: [],
})
export class LayoutModule {}
