import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcComponent } from './ac.component';
import { NgbAccordionModule, NgbCollapseModule, NgbDatepickerModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { WorklogsListComponent } from './worklogs/worklogs-list/worklogs-list.component';
import { WorklogsMapComponent } from './worklogs/worklogs-map/worklogs-map.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SharedModule } from 'src/app/shared/shared.module';



const routes: Routes = [
  {
    path: '',
    component: AcComponent,
    children: [
      {
        path: 'worklogs',
        children: [
          {
            path: '',
            component: WorklogsListComponent,
          },

        ]
      },
    ]
  }
]

@NgModule({
  declarations: [
    AcComponent,
    WorklogsListComponent,
    WorklogsMapComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    NgbNavModule,
    SimplebarAngularModule,
    NgSelectModule,
    NgxSpinnerModule,
    SharedModule,
    //Translate
    TranslateModule,
    NgbCollapseModule,
    NgbProgressbarModule,
    SimplebarAngularModule,
    NgSelectModule,

  ]
})
export class AcModule { }
