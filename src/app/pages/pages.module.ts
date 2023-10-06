import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LandingPagesComponent } from './sys/landing-pages/landing-pages.component';
import { Routes } from '@angular/router';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
