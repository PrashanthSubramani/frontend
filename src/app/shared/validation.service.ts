import { Injectable } from '@angular/core';
import moment from 'moment';
import { from } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Injectable()
export class ValidationService {

  constructor() { }

  //Check Site contains SSL Security protocol  or Not.
  static secureSiteValidator(control:any){
    if (!control.value.startsWith('https') || !control.value.includes('.in')) {
      return { IsSecureSite: true };
    }

    return null;
  }

  //Email Validator
  static emailValidator(control:any) {
      if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
          return null;
      }
      else {
          return { 'InvalidEmail': true };
      }
  }

    static isValidEmailAddress(email: string) {
        //if (email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {

            return true;
        }
        else {
            return false;
        }
    }

  //Password Validator
  static passwordValidator(control:any) {
      if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
          return null;
      }
      else {
          return { 'InvalidPassword': true };
      }
  }

  //Password Validation
  static isPasswordOk(password: string) {

    const passwordLength = environment.passwordLength;
    const securePassword = environment.securePassword;

    ///if(passwordLength > password.length)
    if(3 >= passwordLength)//  && passwordLength > password.length)
    {
        return false;
    } else {
        if(securePassword)
        {
            var regEx = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{'+passwordLength+',})');
            const res = regEx.test(password);
            if(!res)
            {
                return true
            }
        }
        return false;
    }
}

  //no white space allowed
  static noWhitespaceValidator(control:any) {
      const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
  }

static getValueStringBYSplitObject(obj: any) {
    if (obj && obj.length > 0) {
        const result = "," + obj.map((x:any) => x).join(",") + ",";

        return result;
    }
    return null;
}

static getMultipleObjectByStringSplit(value: string) {
    if (value) {
        const records = value.split(",");

        let selectedObj:any = [];
        records.forEach(element => {
            let rec;

            if (`${element}`.trim().length > 0) {
                selectedObj.push(element);
            }
        });
        return selectedObj;
    } else {
        return [];
    }
}

  //value 1,2,3..... or []
static getMultipleObjectBySplit(value: string) {
    if (value) {
        const records = value.split(",");

        let selectedObj:any = [];
        records.forEach(element => {
            let rec;

            if (`${element}`.trim().length > 0)
            {
                selectedObj.push(element);
            }
        });

        return selectedObj;
    } else {
        return [];
    }
}

  static getMultipleSelectedObject(obj: any, value: string) {
    if(value)
    {
        const records = value.split(",");

        let selectedObj:any = [];
        records.forEach(element => {
            let rec;

            //if(typeof element === 'number') {
            if(+element > 0) {
                rec = obj.filter((data:any)=> data['store_value'] === +element)[0];
            } else {
                rec = obj.filter((data:any)=> data['store_value'] === element)[0];
            }

            if(rec)
            {
                selectedObj.push(rec);
            }
        });

        return selectedObj;
    } else {
        return null;
    }
  }

  //value 1,2,3..... or []
  static pluckGetId(obj: [], field_name: string) {
    if(obj && obj.length > 0)
    {
        //grab filed property under id/....
        const check_value = from(obj).pipe(pluck(field_name));

        let store_value:any = [];
        check_value.subscribe(val => store_value.push(val));

        const result = ","+store_value.map((x:any)=>x).join(",")+",";

        return result;
    }
    return null;
  }

  //value 1,2,3..... or []
  static pluckGetDisplayValue(obj: any, value: string, field_name: string) {
    if(value)
    {
        const records = value.split(",");

        let selectedObj:any = [];
        records.forEach(element => {
            let rec;

            //if(typeof element === 'number') {
            if(+element > 0) {
                rec = obj.filter((data:any)=> data['store_value'] === +element)[0];
            } else {
                rec = obj.filter((data:any)=> data['store_value'] === element)[0];
            }

            if(rec)
            {
                selectedObj.push(rec);
            }
        });

        if(selectedObj && selectedObj.length > 0)
        {
            //grab filed property under id/....
            const check_value = from(selectedObj).pipe(pluck(field_name));

            let store_value:any = [];
            check_value.subscribe(val => store_value.push(val));

            const result = store_value.map((x:any)=>x).join(", ");

            return result;
        }
        return null;
    } else {
        return null;
    }
  }

    //Return object selected in the list
    //static getAutoCompleteRecordObject(obj: any, key: string, value: any) {
    static getAutoCompleteRecordObject(obj: any, value: any, use_store_value = true) {
        if(!value) return null;
        //let valueObj: object;
        let valueObj = [];
        if(typeof value === 'number')
        {
            valueObj  = (use_store_value) ? obj.filter((option:any) => +option.store_value === value) : obj.filter((option:any) => +option.display_value === value);
        } else {
            if(use_store_value)
            {
                valueObj  = obj.filter((option:any) => {
                    //return option.store_value.indexOf(value) === 0
                    return `${option.store_value}`.toString().toLocaleUpperCase().trim() === `${value}`.toString().toLocaleUpperCase().trim();
                });
            } else {
                valueObj  = obj.filter((option:any) => {
                    return `${option.display_value}`.toString().toLocaleUpperCase().trim() === `${value}`.toString().toLocaleUpperCase().trim();
                });
            }
        }

        return (valueObj.length > 0) ? valueObj[0] : {};
        //return obj.filter(option => option.store_value.indexOf(value) === 0);
        // const checkRoleExistence = roleParam => obj.some( ({role}) => `@{key}` == roleParam);
    }

    static getValueFromObject(obj: any, value: any) {
        let valueObj: any;
        if(typeof value === 'number')
        {
            valueObj  = obj.filter((option:any) => option.store_value === value);
        } else if(value === null){
            return "All";
        } else {
            valueObj  = obj.filter((option:any) => option.store_value.indexOf(value) === 0);
        }

        return valueObj[0]['display_value'];
    }

    static getValueFromObjectByField(obj: any, value: any, field_name: any) {
        let valueObj: any;

        if(typeof value === 'number')
        {
            valueObj  = obj.filter((option:any) => option[field_name] === value);
        } else if(value === null){
            return "All";
        } else if(!value){
            return null;
        } else {
            valueObj  = obj.filter((option:any) => option[field_name].indexOf(value.toString()) === 0);
        }

        return valueObj[0];
    }

    static getStartOfMonth(strDate:any) {
        return moment(strDate).startOf('month').format('YYYY-MM-DD');
    }

    static getEndOfMonth(strDate:any) {
        return moment(strDate).endOf('month').format('YYYY-MM-DD');
    }

    static getYear(strDate:any) {
        return moment(strDate).startOf('month').format('YYYY');
    }

    static getSelectedMonth(year:any, month:any) {
        var dt = new Date(Number(`${year}`), Number(`${(month).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`), Number(`01`));
        return dt;
    }

    static getPreviousMonth(strDate: any) {
        var month = moment(strDate).subtract(1, 'M');
        var monthStart = moment(month).startOf('month');

        strDate = moment(monthStart).format('YYYY-MM-DD');
        var dt = new Date(Number(`${strDate}`.substr(0,4)), Number(`${strDate}`.substr(5,2))-1, Number(`${strDate}`.substr(8,2)));
        return dt;
    }

    static getNextMonth(strDate: any) {
        var month = moment(strDate).add(1, 'M');
        var monthStart = moment(month).startOf('month');

        strDate = moment(monthStart).format('YYYY-MM-DD');
        var dt = new Date(Number(`${strDate}`.substr(0,4)), Number(`${strDate}`.substr(5,2))-1, Number(`${strDate}`.substr(8,2)));
        return dt;
    }

    static _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }

    static setDateToTableFormat_Simple(strDate: any) {
        if (!strDate) {
            return null;
        }

        var day_value = this._to2digit(Number(`${strDate}`.substr(0, 2)));
        var month_value = this._to2digit(Number(`${strDate}`.substr(3, 2)));
        var year_value = Number(`${strDate}`.substr(6, 4));

        var dt = year_value+"-"+month_value+"-"+day_value;
        return dt;
    }

    static setDateToDisplayFormat_Simple(strDate: any) {
        if (!strDate) {
            return null;
        }

        var year_value = Number(`${strDate}`.substr(0, 4));
        var month_value = this._to2digit(Number(`${strDate}`.substr(5, 2)));
        var day_value = this._to2digit(Number(`${strDate}`.substr(8, 2)));

        var dt = day_value + '-' +month_value+'-'+year_value;
        return dt;
    }

    static setDateToTableFormat(strDate: any) {
        if(!strDate)
        {
            return null;
        }
        var date = new Date(new Date(strDate).getTime() - new Date(strDate).getTimezoneOffset()*60*1000).toISOString().substr(0,19).replace('T', ' ');
        return moment(date).format('YYYY-MM-DD');

        //return moment(strDate).format('YYYY-MM-DD');
    }

    static getTime() {
        return moment().format('HH:mm:ss');
    }

    static setDateToTableFormatWithTime(strDate: any) {
        if(!strDate)
        {
            return null;
        }
        return moment(strDate).format('YYYY-MM-DD HH:mm:ss');
    }

    static setDateToDisplayFormat(strDate: any) {
        return moment(strDate).format('DD/MM/YYYY');
    }

    static setDateToDisplayFormat_Hyphen(strDate: any) {
        return moment(strDate).format('DD-MM-YYYY');
    }

    static getCurrentDate() {
        var date = new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000).toISOString().substr(0,19).replace('T', ' ');
        return moment(date).format('YYYY-MM-DD');
    }

    static getCurrentMonth_Year() {
        return moment().format('MMMM YYYY');
    }

    static getCurrentYear() {
        return moment().format('YYYY');
    }

    static getDateRangeValueByLabels(date_label_id: number) {
        var dt = moment();
        var date_label:any = {};
        switch (date_label_id) {
            case 1: //Today
                date_label = {from_date: dt, to_date: dt};
                break;
            case 2: //Last 7 Days
                date_label = {from_date: moment(dt).subtract(6, 'days'), to_date: dt};
                break;
            case 3: //This month
            case 7: //Custom Range
                date_label = {from_date: moment(dt).startOf('month'), to_date: moment(dt).endOf('month')};
                break;
            case 4: //Last Month
                var pastMonth = moment(dt).subtract(1, 'M');
                date_label = {from_date: moment(pastMonth).startOf('month'), to_date: moment(pastMonth).endOf('month')};
                break;
            case 5: //Last 3 Months
                var pastMonth = moment(dt).subtract(2, 'M');
                date_label = {from_date: moment(pastMonth).startOf('month'), to_date: moment(dt).endOf('month')};
                break;
            case 6: //Current Year
                date_label = {from_date: moment(dt).startOf('year'), to_date: moment(dt).endOf('month')};
                break;
            case 8: //Last 6 Months
                var pastMonth = moment(dt).subtract(5, 'M');
                date_label = { from_date: moment(pastMonth).startOf('month'), to_date: moment(dt).endOf('month') };
                break;
            default:
            break;
        }

        const dt_label = {from_date: this.setDateToTableFormat(date_label['from_date']), to_date: this.setDateToTableFormat(date_label['to_date'])};
        return dt_label;
    }

    static doFilterTable(data:any = [], find_cols: string = "", search: string = ""){
        search = search.trim(); // Remove whitespace
        search = search.toLowerCase();

        let cols = find_cols.split("|");

        var records = data.filter(
            (option:any) => {
                //let result_value = "";
                let search_flag = false;
                cols.forEach(element => {
                    //result_value = result_value + " " + `${option[element]}`.toLowerCase();
                    if (!search_flag)
                    {
                        search_flag = `${option[element]}`.toLowerCase().includes(search);
                    }
                });
                return search_flag;
            }
        );
        return records;
    }

    //value 1,2,3..... or []
    static getMultipleObjectBySplit_ChipFormat(value: string) {
        if (value) {
            const records = value.split(",");

            let selectedObj:any = [];
            records.forEach(element => {
                let rec;

                if (`${element}`.trim().length > 0) {
                    selectedObj.push({ "name": element });
                }
            });

            return selectedObj;
        } else {
            return [];
        }
    }

}
