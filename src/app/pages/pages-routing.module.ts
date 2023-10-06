import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPagesComponent } from './sys/landing-pages/landing-pages.component';

const routes: Routes =[
  {
    path: "",
    component : LandingPagesComponent
  },
  {
    path: 'sys', loadChildren: () => import('./sys/sys.module').then(m => m.SysModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
