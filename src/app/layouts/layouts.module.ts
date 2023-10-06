import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SimplebarAngularModule } from 'simplebar-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FeahterIconModule } from '../core/feather-icon/feather-icon.module';



@NgModule({
  declarations: [
    LayoutsComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forRoot(),
    SimplebarAngularModule,
    FeahterIconModule
  ]
})
export class LayoutsModule { }
