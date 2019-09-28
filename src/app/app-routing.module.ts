import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'landing-page'
},
{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
},
{
  path: '',
  canActivate: [AuthGuard],
  loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
