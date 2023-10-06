import { Component, OnInit,Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {} from 'googlemaps';
import { WorklogService } from '../worklog.service';

declare var google: any;

@Component({
  selector: 'app-worklogs-map',
  templateUrl: './worklogs-map.component.html',
  styleUrls: []
})
export class WorklogsMapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;

  // map: google.maps.Map;

  @Input() record: any;
  permission = {};

  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    public _formBuilder: UntypedFormBuilder,
    private _workLogService: WorklogService,
  ) {
    this.permission = this._workLogService.permission;
    this.record = this._workLogService.ae_data;
  }

  ngOnInit(): void {
    this.loadPayPalSDK();
  }

  loadPayPalSDK(): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAtezclqDeGngJEDNUX-Rb_3krgObmLU6Y`;
    script.async = true;
    script.onload = () => {
      this.initializeGoogleMaps();
    };

    document.head.appendChild(script);
  }


  initializeGoogleMaps(): void {
    var datas = this.record['data'].split(',');
    const mapProperties = {
      center: new google.maps.LatLng(datas[0], datas[1]),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // this.map = new google.maps.Map(
    //   this.mapElement.nativeElement,
    //   mapProperties
    // );
    const markerLatLng = new google.maps.LatLng(datas[0], datas[1]);

    // Create a marker object and set its position
    const marker = new google.maps.Marker({
      position: markerLatLng,
      title: 'Marker Title', // Optional: Customize the marker's tooltip text
      // icon: 'path_to_custom_icon', // Optional: Set a custom marker icon
    });

    // Add the marker to the map
    // marker.setMap(this.map);
  }

  doCloseModal() {
    this.activeModal.dismiss();
  }
}
