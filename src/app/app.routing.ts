import { Routes } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/layout.module').then((m) => m.LayoutModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'errors',
  },
];
