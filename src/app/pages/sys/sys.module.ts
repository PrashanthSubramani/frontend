import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysComponent } from './sys.component';
import { LandingPagesComponent } from './landing-pages/landing-pages.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: SysComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full'
      },
      {
        path: 'lpage',
        component: LandingPagesComponent,
      }
    ]}
  ];
  
@NgModule({
  declarations: [
    SysComponent,
    LandingPagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SysModule { }
