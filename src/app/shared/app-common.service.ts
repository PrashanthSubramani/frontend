import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/i18n/translation.service';
import { ValidationService } from './validation.service';

@Injectable({
  providedIn: 'root'
})
export class AppCommonService {
  apiUrl = this.doGetHostApiUrl();

  constructor(
    private _httpClient: HttpClient,
    private _translationService: TranslationService,
    private _router : Router,
  ) {

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
      // const hosts_list = hosts_json;

      // for (let index = 0; index < hosts_list.length; index++) {
      //   const element = hosts_list[index];
      //   if(url.includes(`${element['find']}`.toLowerCase()))
      //   {
      //     return element['url'];
      //     break;
      //   }
      // }
    }

    return '';
  }
}
