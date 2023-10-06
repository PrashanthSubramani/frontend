import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { AppCommonService } from 'src/app/shared/app-common.service';
@Injectable({
  providedIn: 'root'
})
export class WorklogService {

  ae_data: any = {};

  record_data: any;
  filter_data: any = {};

  onAfterSave$ = new BehaviorSubject({});
  onAfterSaveDetail$: Subject<any>;

  permission = {};

  apiUrl = this._appCommonService.doGetHostApiUrl();
  constructor(
    private _httpClient: HttpClient,
    private _appCommonService: AppCommonService,
  ) {
    this.onAfterSave$ = new BehaviorSubject({});
    this.onAfterSaveDetail$ = new Subject();
  }


  setData(data: any)
  {
    this.record_data = data;
  }

  getData()
  {
    return this.record_data;
  }

  setFilterData(data: any)
  {
    this.filter_data = data;
  }

  getFilterData()
  {
    return this.filter_data;
  }

  getList(postData: any) {
    return this._httpClient.post(`${this.apiUrl}/api/ac_worklogs_list`, postData )
              .pipe(map((response: any) => response ));
  }

  getGroupList(postData: any) {
    return this._httpClient.post(`${this.apiUrl}/api/ac_worklogs_grouplist`, postData )
              .pipe(map((response: any) => response ));
  }

  fetchData(postData: any)
  {
    return this._httpClient.post(`${this.apiUrl}/api/ac_worklogs_data`, postData )
              .pipe(map((response: any) => response ));
  }

  saveRecord(postData: any)
  {
    return this._httpClient.post(`${this.apiUrl}/api/ac_worklogs_store`, postData )
              .pipe(map((response: any) => response ));
  }


  getUserList(postData: any) {
    return this._httpClient.post(`${this.apiUrl}/api/ac_worklogs_userlist`, postData )
              .pipe(map((response: any) => response ));
  }

  deleteRecord(postData: any) {
    return this._httpClient.post(`${this.apiUrl}/api/ac_worklogs_delete`, postData)
      .pipe(map((response: any) => response));
  }

  getUserDetails(postData: any) {
    return this._httpClient.post(`${this.apiUrl}/api/ac_worklogs_user_details`, postData)
      .pipe(map((response: any) => response));
  }

  downloadFile(postData: any) {
    return this._httpClient.post(`${this.apiUrl}/api/ac_worklogs_download_file`, postData)
      .pipe(map((response: any) => response));
  }

}
