import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bc-design',
  templateUrl: './bc-design.component.html',
  styles: []
})
export class BcDesignComponent implements OnInit {
  @Input() bcData: any;

  breadCrumbsInfo = {};
  filter_data = {};
  constructor(
    private _router: Router,
  ) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['bcData'] && changes['bcData']['currentValue']) {
      this.breadCrumbsInfo = changes['bcData']['currentValue'];

    }
  }

  doRefreshPage(page_link) {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([page_link]);
    });
  }

}