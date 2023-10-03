import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    LayoutsComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutsModule { }
