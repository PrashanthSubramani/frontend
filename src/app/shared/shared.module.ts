import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbAccordionModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Counter
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FeahterIconModule } from '../core/feather-icon/feather-icon.module';
import { BcDesignComponent } from '../pages/sys/bc-design/bc-design.component';


@NgModule({
    declarations: [
        BcDesignComponent,
    ],
    imports: [
        CommonModule,
        NgbNavModule,
        NgbAccordionModule,

        NgbPaginationModule,
        NgbTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        FeahterIconModule,
        TranslateModule,
    ],
    exports: [
        BcDesignComponent
    ]
})
export class SharedModule { }
