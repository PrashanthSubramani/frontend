import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/i18n/translation.service';
import { ValidationService } from './validation.service';
import * as hosts_json from '../../assets/json/hosts.json';
import * as lists_json from '../../assets/json/lists.json';
@Injectable({
  providedIn: 'root'
})
export class AppCommonService {
  apiUrl = this.doGetHostApiUrl();

  public readonly module_icons: any[] = [
    { id: 1, name: "activity" },
    { id: 2, name: "airplay" },
    { id: 3, name: "align-justify" },
    { id: 4, name: "alert-triangle" },
    { id: 5, name: "archive" },
    { id: 6, name: "at-sign" },
    { id: 7, name: "award" },
    { id: 8, name: "bar-chart-2" },
    { id: 9, name: "bookmark" },
    { id: 10, name: "calendar" },
    { id: 11, name: "camera" },
    { id: 12, name: "cast" },
    { id: 13, name: "clipboard" },
    { id: 14, name: "cloud" },
    { id: 15, name: "cpu" },
    { id: 16, name: "database" },
    { id: 17, name: "dollar-sign" },
    { id: 18, name: "folder" },
    { id: 19, name: "gift" },
    { id: 20, name: "grid" },
    { id: 21, name: "hard-drive" },
    { id: 22, name: "home" },
    { id: 23, name: "layers" },
    { id: 24, name: "lock" },
    { id: 25, name: "menu" },
    { id: 26, name: "monitor" },
    { id: 27, name: "pen-tool" },
    { id: 28, name: "pie-chart" },
    { id: 29, name: "power" },
    { id: 30, name: "printer" },
    { id: 31, name: "shopping-bag" },
    { id: 32, name: "star" },
    { id: 33, name: "truck" },
    { id: 34, name: "tv" },
    { id: 35, name: "users" },
    { id: 36, name: "video" },
  ];


  constructor(
  ) {

  }


  doGetShowEntity() {
    const url = `${window.location.host}`.toLowerCase();

    let app_key: string = '';
    if (!environment.production) {
        app_key = '';
      } else {
        const hosts_list = hosts_json;
        for (let index = 0; index < hosts_list.length; index++) {
          const element = hosts_list[index];
          if (url.includes(`${element['find']}`.toLowerCase())) {
            if (element['app_key'])
            {
              app_key = element['app_key'];
              break;
            }
          }
        }
      }

    return (app_key === '') ? true : false;
  }

  doGetHostEntity()
  {
    const url = `${window.location.host}`.toLowerCase();
      const hosts_list = hosts_json;

      let app_key: string = '';
      for (let index = 0; index < hosts_list.length; index++) {
        const element = hosts_list[index];
        if(url.includes(`${element['find']}`.toLowerCase()))
        {
          if (element['app_key']) {
            app_key = element['app_key'];
            break;
          }
        }
    }

    return app_key;
  }


  doGetHostApiUrl()
  {
    const url = `${window.location.host}`.toLowerCase();

    if(!environment.production)
    {
      
      if (url.includes('4201')) {
        return 'http://localhost:4201';
      } else {
        return 'http://localhost:5000';
      }

    } else {

      const hosts_list = hosts_json;
      for (let index = 0; index < hosts_list.length; index++) {
        const element = hosts_list[index];
        if(url.includes(`${element['find']}`.toLowerCase()))
        {
          return element['url'];
          break;
        }
      }
    }

    return '';
  }
}
