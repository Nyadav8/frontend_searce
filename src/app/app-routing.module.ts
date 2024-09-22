import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullcomponentComponent } from './fullcomponent/fullcomponent.component';
import { BlankcompnentComponent } from './blankcompnent/blankcompnent.component';
import { AuthGuard } from './authentication/login/auth.gaurd';

const routes: Routes = [
  {
    path: '',
    component: FullcomponentComponent,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/project/project.module').then(
            (m) => m.ProjectModule
          ),
      },
      {
        path: 'details',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/projectdetails/projectdetails.module').then(
            (m) => m.ProjectdetailsModule
          ),
      },
    ],
  },
  {
    path: 'module',
    component: BlankcompnentComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
