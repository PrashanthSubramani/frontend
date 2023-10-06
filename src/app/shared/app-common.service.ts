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

  doGenerateFilterParamDefinition_ToShowScreen(curDefValues = {}) {
    //STR => String
    //CTS => Convert To String
    //CTB => Convert To Boolean

    let resultValue: any;

    let def = curDefValues['definition'];
    let data = curDefValues['data'];
    let list = (curDefValues['list']) ? curDefValues['list'] : undefined;

    let type = (def['type']) ? def['type'] : 'STR';

    let field_name = (def['field_name']) ? def['field_name'] : def['key_name'];
   
    switch (type) {
      case 'STR':
        resultValue = (data[field_name]) ? `${data[field_name]}`.trim() : null;
        break;
      case 'CTS':
        resultValue = data[field_name].toString();
        break;
      case 'CTB':
        var compare_value = (def['compare_value']) ? def['compare_value'] : 'Y';
        resultValue = (data[field_name] === compare_value) ? true : false;
        break;
      case 'DATE':
        resultValue = ValidationService.setDateToDisplayFormat_Simple(data[field_name]);
        break;

        case 'DOC_DT_RANGE':
          if(data['doc_date_labels']!=null){
            if(data['doc_date_labels']['store_value'] === 7)
            {
              resultValue = `${data['doc_from_date']}`.split('-').join('/') + " - " + `${data['doc_to_date']}`.split('-').join('/');

            }else{
              resultValue = data['doc_date_labels']['display_value'];

            }
          }

        break;
      case 'DT_RANGE':
        if(data['date_labels']!=null){
          if (data['date_labels']['store_value'] === 7)
          {
            resultValue = `${data['from_date']}`.split('-').join('/') + " - " + `${data['to_date']}`.split('-').join('/');
          } else {
            resultValue = data['date_labels']['display_value'];
          }
        }

        break;


      case 'DT_RANGE_NEW':
        if (data['date_labels']['store_value'] === 7) {
          //resultValue = `${data['from_date']}`.split('-').join('/') + " - " + `${data['to_date']}`.split('-').join('/');
        } else {
          //resultValue = data['date_labels']['display_value'];
        }
        break;
      case 'LIST':
        if(data[field_name])
        {
          var disp_col_name = (def['disp_col_name']) ? def['disp_col_name'] : 'display_value';
          resultValue = data[field_name][disp_col_name];
        } else {
          resultValue = null;
        }
        break;
      case 'LOV':
        if (data[field_name]) {
          resultValue = data[field_name]['display_value'];
        } else {
          resultValue = null;
        }
        break;
      default:
        break;
    }

    return resultValue;
  }

  
  doGenerateResultValue(curDefValues = {})
  {
    //STR => String
    //CTS => Convert To String
    //CTB => Convert To Boolean

    let resultValue: any;

    let def = curDefValues['definition'];
    let data = curDefValues['data'];
    let list = (curDefValues['list']) ? curDefValues['list'] : undefined;

    let type = (def['type']) ?  def['type'] : 'STR';

    let field_name = (def['field_name']) ? def['field_name'] : def['key_name']
    switch (type) {
      case 'STR':
        resultValue = data[field_name];
        break;
      case 'CTS':
          resultValue = data[field_name].toString();
        break;
      case 'CTB':
        var compare_value = (def['compare_value']) ? def['compare_value'] : 'Y';
        resultValue = (data[field_name] === compare_value) ? true : false;
        break;
      case 'CTU':
        var compare_value = (def['compare_value']) ? def['compare_value'] : 'S';
        resultValue = (data[field_name] === compare_value) ? true : false;
        break;
      case 'DATE':
        resultValue = ValidationService.setDateToDisplayFormat_Simple(data[field_name]);
        if (resultValue === '0-0-0') resultValue = null;
        break;
      case 'LIST':
        resultValue = ValidationService.getAutoCompleteRecordObject(list, data[field_name]);
        break;
      case 'LIST_EXT': //List Extract
        resultValue = ValidationService.getAutoCompleteRecordObject(list, data[field_name]);
        break;
      case 'LOV':
        var lov_obj = {};

        var obj_bind_to = def['obj_bind_to'];
        obj_bind_to.forEach(element => {
          lov_obj[element['bind_name']] = data[element['key_name']];
        });

        resultValue = lov_obj;
        break;
      case 'IMG':
        resultValue = data[field_name] || 'assets/images/users/blank.png';
        break;
      default:
        break;
    }

    return resultValue;
  }

  doGenerateResultValue_OnSaveData(curDefValues = {}) {
    //STR => String
    //CTS => Convert To String
    //CTB => Convert To Boolean
    //CFB => Convert From Boolean

    let resultValue: any;

    let def = curDefValues['definition'];
    let data = curDefValues['data'];
    let list = (curDefValues['list']) ? curDefValues['list'] : undefined;

    let type = (def['type']) ? def['type'] : 'STR';

    let field_name = (def['field_name']) ? def['field_name'] : def['key_name'];

    switch (type) {
      case 'CFB':
        // Y-N
        var true_value = (def['true_value']) ? def['true_value'] : 'Y';
        var false_value = (def['false_value']) ? def['false_value'] : 'N';
        resultValue = (data[field_name]) ? true_value : false_value;
        break;
      case 'CFU':
        // Y-N
        var true_value = (def['true_value']) ? def['true_value'] : 'S';
        var false_value = (def['false_value']) ? def['false_value'] : 'A';
        resultValue = (data[field_name]) ? true_value : false_value;
        break;
      case 'DATE':
        resultValue = ValidationService.setDateToTableFormat_Simple(data[field_name]);
        break;
      case 'LIST_EXT': //List Extract
        var ref_obj = data[def['ref_obj']];
        if (ref_obj)
        {
          resultValue = ref_obj[def['extract_key_name']];
        } else {
          resultValue = null;
        }
        break;
      default:
        break;
    }

    return resultValue;
  }

  doGetRandomInt(length: number) {
    var randomChars = '0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }


  doTableNameFormat(tbl_name: string) {
    // if(environment.tbl_name_upper_case)
    // {
   
    //   return tbl_name.toUpperCase();
    // }
 
    return tbl_name.toLowerCase();
  }
}
