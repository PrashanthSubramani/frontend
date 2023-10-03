import { Injectable } from '@angular/core';
import { TranslationService } from 'src/app/i18n/translation.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})
export class AppToastrService {
  constructor(
    private _translationService: TranslationService,
    private toastr: ToastrService,
  ) { 
  }

  showErrors(module_name: string, error: any): void {
    //common error msg.
    var strMessage: any = 'COMMON.SERVER_ERROR';
    if (typeof error === 'object') {
      for (const key in error) {
        if (error.hasOwnProperty(key)) {
          const element = error[key];

          strMessage = module_name + "." + element;
          break;
        }
      }
    }

    this.errorMessage(strMessage);
  }

  errorMessage(msg: string, use_translate:boolean = true): void
  {
    var strMessage:any = (use_translate) ? this._translationService.getInstantValue(msg) : msg;

    this.toastr.error(strMessage);
  }

  successMessage(msg: string, use_translate: boolean = true): void
  {
    var strMessage: any = (use_translate) ? this._translationService.getInstantValue(msg) : msg;
    this.toastr.success(strMessage);
  }  

  doAlert_RecordMismatched(rec_count: number, type: string = "")
  {
    if (rec_count === 0)
    {
      Swal.fire({
        title: `<h4>${this._translationService.getInstantValue('COMMON.SELECT_RECORD')}</h4>`,
        confirmButtonText: this._translationService.getInstantValue('COMMON.OK'),
      });
      
      return false;
    } else {
      if (type === 'edit' || type === 'copy' || type === 'export') {
        if (rec_count === 0 || rec_count > 1)
        {
          Swal.fire({
            title: `<h4>${this._translationService.getInstantValue('COMMON.SELECT_RECORD')}</h4>`,
            confirmButtonText: this._translationService.getInstantValue('COMMON.OK'),
          });

          return false;
        }
      }
    }    

    return true;
  }
}
