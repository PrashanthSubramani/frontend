import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
{path:'',component: LayoutsComponent, loadChildren: ()=> import('./pages/pages.module').then(m => m.PagesModule), canActivate:[AuthGuard]},
{path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
{ path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
