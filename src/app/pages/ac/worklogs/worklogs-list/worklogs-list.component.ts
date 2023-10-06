import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ɵɵelementStart } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { filter, finalize, startWith } from "rxjs/operators";
import Swal from "sweetalert2";

//Translate Start
import { TranslationService } from "src/app/i18n/translation.service";
import { locale as english } from "src/app/navigation/i18n/ac/worklogs/en";
import { locale as spanish } from "src/app/navigation/i18n/ac/worklogs/es";

import { locale as common_english } from "src/app/navigation/i18n/en";
import { locale as common_spanish } from "src/app/navigation/i18n/es";
//Translate End

import { Router } from "@angular/router";
import { AppToastrService } from "src/app/shared/app-toastr.service";
import { AppCommonService } from "src/app/shared/app-common.service";
import { BreadCrumbsService } from "src/app/shared/bread-crumbs-service";
import { ValidationService } from "src/app/shared/validation.service";

import { WorklogService } from "../worklog.service";
import { WorklogsMapComponent } from "../worklogs-map/worklogs-map.component";


@Component({
  selector: "app-worklogs-list",
  templateUrl: "./worklogs-list.component.html",
  styleUrls: [],
})
export class WorklogsListComponent implements OnInit {
  @ViewChild("initialCtrlFocus") initialCtrlFocus: ElementRef;
  isCollapsed: { [key: string]: boolean } = {};
  //LOV Dialog & properties
  isLov_Opened: boolean = false;
  @ViewChild("department", { static: false }) DepartmentField: ElementRef;
  //LOV END
  initialLoad: boolean = true;
  i18n_name: string = "WORKLOGS";
  rowsControls = [];
  @Input() record: any;
  @Input() filter_tbl: string = "";
  location: { latitude: number, longitude: number };
  errorMessage: string;

  lists_autocomplete: { [key: string]: any[] } = {
    att_department_name: undefined,
  };
  
  //Toggle Sidebar
  showSideBar = false;
  dataSource = [];
  GroupdataSource = [];
  page = 1;
  pageSize = 10;
  totalRows = 0;
  GrouptotalRows = 0;
  information = false;
  form: UntypedFormGroup;
  filterParameters: UntypedFormGroup;
  filterBy = {};
  filterParamsContains = [];
  filterParamsContainsUser = [];
  currentDate: Date;
  breadCrumbsInfo = {};
  permission = {};
  ipAddress = [];
  entry = false;
  exit = false;
  report = true;
  user = false;
  groupData = [];
  IpAddress = [];
  total_entry = [];
  total_exit = [];
  total_count = [];
  total_user = [];
  originalData = [];
  dataSourceUser = [];
  userAction = "Add";
  FilterDate ='';
  myStatusSelectValue=[];

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public modalService: NgbModal,
    private _router: Router,
    private _worklogService: WorklogService,
    private _toastr: AppToastrService,
    private _translationService: TranslationService,
    public _spinner: NgxSpinnerService,
    private _appCommonService: AppCommonService,
    private _breadCrumbsService: BreadCrumbsService
  ) {
    this._translationService.loadTranslations(
      english,
      common_english,
      spanish,
      common_spanish
    );

    this.breadCrumbsInfo = this._breadCrumbsService.doGetPageDetails();
    this.permission = this.breadCrumbsInfo["permission"];
    this._worklogService.permission = this.permission;
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [0],
      mobile_phone: [null],
      comments: [null],
      full_name: [null],
      department_name: [null],
      department: [null],
      department_display_value: [null],
      access_pin: [null],
      flag: [true],
    });
    this.filterParameterGroup();

  }



  ngAfterViewInit() {
    this.doLoadData();
    this.doGroupData();
    this.doGetList();
    this.doGetUserList();
    this.doLoadEditData("add", 0);
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.errorMessage = null;
        },
        (error) => {
          this.errorMessage = "Error getting location: " + error.message;
          this.location = null;
        }
      );
    } else {
      this.errorMessage = "Geolocation is not supported by this browser.";
      this.location = null;
    }
  }

  onDateLabelChanged() {
    if (this.filterParameters.get("date_labels").value) {
      var date_val = ValidationService.getDateRangeValueByLabels(
        this.filterParameters.get("date_labels").value.id
      );
      this.filterParameters.patchValue({
        dt_range: { from: date_val["from_date"], to: date_val["to_date"] },
      });

      var from_date = ValidationService.setDateToDisplayFormat_Hyphen(
        date_val["from_date"]
      );
      this.filterParameters.get("from_date").setValue(from_date);

      var to_date = ValidationService.setDateToDisplayFormat_Hyphen(
        date_val["to_date"]
      );
      this.filterParameters.get("to_date").setValue(to_date);
    } else {
      this.filterParameters.get("from_date").setValue(null);
      this.filterParameters.get("to_date").setValue(null);
    }
  }

  onDateSelect() {
    if (this.filterParameters.get("dt_range")) {
      const dt_range = this.filterParameters.get("dt_range").value;
      if (dt_range["from"] && dt_range["to"]) {
        var from_date = ValidationService.setDateToDisplayFormat_Hyphen(
          dt_range["from"]
        );
        this.filterParameters.get("from_date").setValue(from_date);

        var to_date = ValidationService.setDateToDisplayFormat_Hyphen(
          dt_range["to"]
        );
        this.filterParameters.get("to_date").setValue(to_date);
      } else {
        var from_date = ValidationService.setDateToDisplayFormat_Hyphen(
          dt_range["from"]
        );
        this.filterParameters.get("from_date").setValue(from_date);
        this.filterParameters.get("to_date").setValue(from_date);
      }
    }
  }

  filterParameterGroup() {
    this.filterParameters = this._formBuilder.group({
      date_labels: [null],
      from_date: [null, [Validators.required, Validators.maxLength(10)]],
      to_date: [null, [Validators.required, Validators.maxLength(10)]],
      dt_range: [{ from: null, to: null }],
      department_id: [null],
      full_name: [null],
      department_name: [null],
      att_department_name: [null],
      mobile_phone: [null],
      att_mobile_phone: [null],
      att_full_name:[null]
    });

    var date_labels = [
      {
        id: 1,
        store_value: 1,
        display_value: this._translationService.getInstantValue("DATE.TODAY"),
      },
      {
        id: 2,
        store_value: 2,
        display_value:
          this._translationService.getInstantValue("DATE.LAST_7DAYS"),
      },
      {
        id: 3,
        store_value: 3,
        display_value:
          this._translationService.getInstantValue("DATE.THIS_MONTH"),
      },
      {
        id: 4,
        store_value: 4,
        display_value:
          this._translationService.getInstantValue("DATE.LAST_MONTH"),
      },
      {
        id: 5,
        store_value: 5,
        display_value:
          this._translationService.getInstantValue("DATE.LAST_3_MONTHS"),
      },
      {
        id: 6,
        store_value: 6,
        display_value:
          this._translationService.getInstantValue("DATE.CURRENT_YEAR"),
      },
      {
        id: 7,
        store_value: 7,
        display_value:
          this._translationService.getInstantValue("DATE.CUSTOM_RANGE"),
      },
    ];

    this.lists_autocomplete.date_labels = date_labels;

    this.filterParameters.patchValue({
      date_labels: ValidationService.getAutoCompleteRecordObject(
        this.lists_autocomplete["date_labels"],
        1
      ),
    });
    this.onDateLabelChanged();
  }

  doChangePageSize() {
    this.doGetList();
  }

  onSearchClick() {
    this.filterParameters.patchValue({ department_id: null });
    this.doGetList();
    this.doGetUserList();
    this.doGroupData();
    this.showSideBar = false;
    this.filter_tbl = "";
    //filterParamsContains
    if(this.report){
      this.filterParamsContains = [];
    }

    if(this.user){
      this.filterParamsContainsUser = [];
    }

    const formData = this.filterParameters.getRawValue();
    const definition_list = this.getFilterDefinition();
    definition_list.forEach((curDef) => {
      const curDefValues = {}; //Current Definition Values
      curDefValues["definition"] = curDef;
      curDefValues["data"] = formData;
      if (curDef["list_name"]) {
        curDefValues["list"] = this.lists_autocomplete[curDef["list_name"]];
      }

      let resultValue: any =
        this._appCommonService.doGenerateFilterParamDefinition_ToShowScreen(
          curDefValues
        );
      const keypair_data = {
        name: this._translationService.getInstantValue(
          this.i18n_name + "." + curDef["label"]
        ),
        value: resultValue,
      };
      if (resultValue && resultValue !== "" && resultValue !== "null") {
        if(this.report){
          this.filterParamsContains.push(keypair_data);
        }

        if(this.user){
          this.filterParamsContainsUser.push(keypair_data);
        }

      }
    });
  }

  getFilterDefinition() {
    let def = [];
    if (this.report) {
      def.push({
        label: "DT_LBL",
        type: "DT_RANGE",
        start_date: this.filterParameters.get("from_date").value,
        to_date: this.filterParameters.get("to_date").value,
      });

      def.push({ key_name: "att_full_name", label: "NAME" });
      def.push({ key_name: "att_mobile_phone", label: "MOBILE_PHONE" });
      def.push({
        key_name: "att_department_name",
        label: "DEPARTMENT",
        type: "LIST",
        list_name: "att_department_name",
        disp_col_name: "display_value",
      });
    }

    if (this.user) {
      def.push({ key_name: "department_name", label: "DEPARTMENT" });
      def.push({ key_name: "full_name", label: "NAME" });
    }

    return def;
  }

  onClearClick() {
    this.initialCtrlFocus.nativeElement.focus();
    this.onDateLabelChanged();
    this.filterParameters.reset();
  }

  doGetList() {
    this.filterBy = {
      CurrentPageNumber: this.page,
      PageSize: this.pageSize,
      action: "list",
      order_by_field: "",
      order_by: "asc",
      filterParameters: this.filterParameters.getRawValue(),
    };

    this._spinner.show();
    this._worklogService
      .getList(this.filterBy)
      .pipe(
        finalize(() => {
          this._spinner.hide();
        })
      )
      .subscribe(
        (res) => {
          if (res["error"] === 1) {
            this._toastr.errorMessage("COMMON.SERVER_ERROR");
          } else {
            this.dataSource = res["index"];
            this.totalRows = res["totalRows"];
            this.total_entry = res.total_entry;
            this.total_exit = res.total_exit;
            this.total_count = res.total_count;
            this.total_user = res.user_total;
            this.lists_autocomplete['att_department_name'] = res.att_department;

            if (this.initialLoad) {
              this.initialLoad = false;
            }
          }
        },
        (error) => {

          if ((error.status && error.status !== 401) || !error.status) {
            this._toastr.errorMessage("COMMON.SERVER_ERROR");
          }
        }
      );
  }

  doGetUserList() {
    this.filterBy = {
      CurrentPageNumber: this.page,
      PageSize: this.pageSize,
      action: "list",
      order_by_field: "",
      order_by: "asc",
      filterParameters: this.filterParameters.getRawValue(),
    };

    this._spinner.show();
    this._worklogService
      .getUserList(this.filterBy)
      .pipe(
        finalize(() => {
          this._spinner.hide();
        })
      )
      .subscribe(
        (res) => {
          if (res["error"] === 1) {
            this._toastr.errorMessage("COMMON.SERVER_ERROR");
          } else {
            this.dataSourceUser = res["index"];
            this.total_user = res["index"].length;

            if (this.initialLoad) {
              this.initialLoad = false;
            }
          }
        },
        (error) => {

          if ((error.status && error.status !== 401) || !error.status) {
            this._toastr.errorMessage("COMMON.SERVER_ERROR");
          }
        }
      );
  }

  doGroupData() {

    this.filterBy = {
      CurrentPageNumber: this.page,
      PageSize: this.pageSize,
      action: "list",
      order_by_field: "",
      order_by: "asc",
      date: this.FilterDate,
    };

    this._spinner.show();
    this._worklogService
      .getGroupList(this.filterBy)
      .pipe(
        finalize(() => {
          this._spinner.hide();
        })
      )
      .subscribe(
        (res) => {
          if (res["error"] === 1) {
            this._toastr.errorMessage("COMMON.SERVER_ERROR");
          } else {
            this.GroupdataSource = res["index"];
            this.originalData = res["index"];
            this.GroupdataSource.forEach((record) => {
              this.isCollapsed[record.id] = true;
            });
          }
        },
        (error) => {
          if ((error.status && error.status !== 401) || !error.status) {
            this._toastr.errorMessage("COMMON.SERVER_ERROR");
          }
        }
      );
  }



  onSearchDateClick(event) {
  
      this.filterParameters.patchValue({ from_date: event.target.value });
      this.filterParameters.patchValue({ to_date: event.target.value });
      this.filterParameters.patchValue({ department_id: null });
      this.FilterDate = event.target.value;
      this.filterParamsContains = [];
      this.doGroupData();
      this.doGetList();
  }

  doRefreshPage() {
    this._router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this._router.navigate(["ac/worklogs"]);
    });
  }

  doLoadData() {
    const filterBy = {
      action: "add",
      id: 0,
      card: "ENTRYOREXIT",
    };

    this._spinner.show();
    this._worklogService
      .fetchData(filterBy)
      .pipe(
        finalize(() => {
          this._spinner.hide();
        })
      )
      .subscribe({
        next: (res) => {},
        error: (err) => {
          if ((err.status && err.status !== 401) || !err.status) {
            this._toastr.errorMessage("COMMON.SERVER_ERROR");
          }
        },
      });
  }

  doGenerateData(res) {
    //Populate data
    const formDataDefinition = this.getPopulateDefinition();
    formDataDefinition.forEach((curDef) => {
      const curDefValues = {}; //Current Definition Values
      curDefValues["definition"] = curDef;
      curDefValues["data"] = res.data;
      if (curDef["list_name"]) {
        curDefValues["list"] = this.lists_autocomplete[curDef["list_name"]];
      }

      let resultValue: any =
        this._appCommonService.doGenerateResultValue(curDefValues);
      this.form.patchValue({ [curDef["key_name"]]: resultValue });
    });
  }

  getPopulateDefinition() {
    let def = [];
    def.push({
      key_name: "department",
      type: "LOV",
      obj_bind_to: [
        { key_name: "department_id", bind_name: "store_value" },
        { key_name: "department_id", bind_name: "id" },
        { key_name: "department", bind_name: "display_value" },
      ],
    });
    def.push({
      key_name: "department_display_value",
      type: "STR",
      field_name: "department",
    });
    def.push({ key_name: "flag", type: "CTB" });
    return def;
  }

  get getControls() {
    return this.form.controls;
  }

  formValidation(): boolean {
    const controls = this.getControls;
  

    if (this.entry || this.exit) {
      this.form.controls["mobile_phone"].setValidators(Validators.required);
    }
    this.form.controls["mobile_phone"].updateValueAndValidity();

    if (this.user) {
      this.form.controls["full_name"].setValidators(Validators.required);
      this.form.controls["department_display_value"].setValidators(
        Validators.required
      );
      this.form.controls["access_pin"].setValidators(Validators.required);
      this.form.controls["mobile_phone"].setValidators(Validators.required);
    }

    this.form.controls["full_name"].updateValueAndValidity();
    this.form.controls["department_display_value"].updateValueAndValidity();
    this.form.controls["access_pin"].updateValueAndValidity();
    this.form.controls["mobile_phone"].updateValueAndValidity();

    /** check form */
    if (this.form.invalid) {
      Object.keys(controls).forEach((controlName) => {
        controls[controlName].markAsTouched();
      });

      this._toastr.errorMessage("COMMON.FIELD_IS_REQUIRED_MSG");

      return false;
    }

    return true;
  }

  doSaveData(): void {
    if (this.formValidation()) {
      const formData = this.doGenerateSaveData();

      this._spinner.show();

      this._worklogService
        .saveRecord(formData)
        .pipe(
          finalize(() => {
            this._spinner.hide();
          })
        )
        .subscribe({
          next: (v) => {
            if (v["error"] === 0) {
              this._toastr.successMessage(v["message"]);
              if (this.entry || this.exit) {
                this.doRefreshPage();
              } else {
                this.userAction = 'Add';
                this.doGetUserList();
                this.form.reset();
                this.form.patchValue({id:0});
              }
            } else {
              this._toastr.errorMessage(v["message"]);
            }
          },
          error: (e) => {
            this._toastr.showErrors(this.i18n_name, e);
          },
        });
    }
  }

  getSaveDefinition() {
    let def = [];
    def.push({ key_name: "flag", type: "CFB" });
    return def;
  }

  doGenerateSaveData() {
    const formData = this.form.getRawValue();

    formData.action = "add";

    if (this.entry) {
      formData.entry = "E";
      formData.userData = "";
    } else if (this.exit) {
      formData.entry = "X";
      formData.userData = "";
    } else if (this.user) {
      formData.userData = "USER";
    }

    formData.location = this.location;

    //Populate data
    const formDataDefinition = this.getSaveDefinition();
    formDataDefinition.forEach((curDef) => {
      const curDefValues = {}; //Current Definition Values
      curDefValues["definition"] = curDef;
      curDefValues["data"] = formData;
      if (curDef["list_name"]) {
        curDefValues["list"] = this.lists_autocomplete[curDef["list_name"]];
      }

      let resultValue: any =
        this._appCommonService.doGenerateResultValue_OnSaveData(curDefValues);
      formData[curDef["key_name"]] = resultValue;
    });

    return formData;
  }

  ClickCard(event: any) {
    if (event === "ENTRY") {
      this.doLoadData();
      this.entry = true;
      this.exit = false;
      this.report = false;
      this.user = false;
    } else if (event === "EXIT") {
      this.doLoadData();
      this.entry = false;
      this.exit = true;
      this.report = false;
      this.user = false;
    } else if (event === "REPORT") {
      this.doGetList();
      this.doGroupData();
      this.entry = false;
      this.exit = false;
      this.report = true;
      this.user = false;
    } else {
      this.doGetList();
      this.doGroupData();
      this.doGetUserList();
      this.entry = false;
      this.exit = false;
      this.report = false;
      this.user = true;
    }
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  OpenGoogleMap(action: string, record: any) {
    this.doOpenModalWindow(action, record);
  }

  doOpenModalWindow(action: string, data: number, extra = {}) {
    const modalRef = this.modalService.open(WorklogsMapComponent, {
      keyboard: true,
      backdrop: "static",
      size: "lg",
    });
    modalRef.componentInstance.record = {
      action: action,
      data: data,
      extra: extra,
    };
    modalRef.result.then(
      (result) => {},
      (reason) => {}
    );
  }

  toggleCollapse(recordId: string) {
    this.isCollapsed[recordId] = !this.isCollapsed[recordId];
  }

  filterDepartment(date: any, department_id: any) {
    this.filterParameters.reset();
    this.filterParamsContains = [];
    this.filterParameters.patchValue({
      date_labels: ValidationService.getAutoCompleteRecordObject(
        this.lists_autocomplete["date_labels"],
        1
      ),
    });
    this.onDateLabelChanged();

    if (date != null && department_id != null) {
      this.filterParameters.patchValue({ department_id: department_id });
      this.filterParameters.patchValue({ from_date: date });
      this.filterParameters.patchValue({ to_date: date });
      this.doGetList();
    } else {
      this._toastr.errorMessage("COMMON.SERVER_ERROR");
    }
  }

  filterAllDepartment(date: any) {
    this.filterParameters.reset();
    this.filterParameters.patchValue({
      date_labels: ValidationService.getAutoCompleteRecordObject(
        this.lists_autocomplete["date_labels"],
        1
      ),
    });
    this.onDateLabelChanged();
    this.filterParamsContains = [];
    if (date != null) {
      this.filterParameters.patchValue({ from_date: date });
      this.filterParameters.patchValue({ to_date: date });
      this.doGetList();
    } else {
      this._toastr.errorMessage("COMMON.SERVER_ERROR");
    }
  }

  doAddEditRecord(action: string, record: any) {
    this.doLoadEditData(action, record["id"]);
  }

  doLoadEditData(action, id) {
    const filterBy = {
      action: action,
      id: id,
      card: "USER",
    };

    this._spinner.show();
    this._worklogService
      .fetchData(filterBy)
      .pipe(
        finalize(() => {
          this._spinner.hide();
        })
      )
      .subscribe({
        next: (res) => {
          if (action == "edit" || action == "copy") {
            this.form.patchValue(res.data);
            this.userAction = "Edit";
            this.doGenerateData(res);

            //Copy record is act like new record. so, here we set record id is 0.
            if (action === "copy") {
              this.form.patchValue({ id: 0 });
              this.userAction = "Add";
            }
          } else {
          }
        },
        error: (err) => {
  
          if ((err.status && err.status !== 401) || !err.status) {
            this._toastr.errorMessage("COMMON.SERVER_ERROR");
          }
        },
      });
  }

  public toggleAccessPin(record: any): void {
    record.showAccessPin = !record.showAccessPin;
  }

  doDeleteRecord(record: any, multiple_delete: boolean = false) {
    var lbl_info = "COMMON.DELETE_RECORD_CONFIRMATION";
    let selectedData = [];
    if (multiple_delete) {
      selectedData = this.dataSource.filter((data) => data.checked === true);
      lbl_info = "COMMON.DELETE_RECORD_CONFIRMATION_SELECTED";
    } else {
      selectedData.push(record);
    }

    if (!this._toastr.doAlert_RecordMismatched(selectedData.length, "del")) {
      return;
    }

    Swal.fire({
      title: `<h4>${this._translationService.getInstantValue(lbl_info)}</h4>`,
      showCancelButton: true,
      confirmButtonText: this._translationService.getInstantValue("COMMON.YES"),
      cancelButtonText: this._translationService.getInstantValue("COMMON.NO"),
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //var delete_ids: string = record['id'] + ',';
        var delete_ids: string = "";
        selectedData.forEach((record) => {
          delete_ids = delete_ids + record["id"] + ",";
        });

        this._spinner.show();
        this._worklogService
          .deleteRecord({ id: delete_ids })
          .pipe(
            finalize(() => {
              this._spinner.hide();
            })
          )
          .subscribe({
            next: (res) => {
              if (res["error"] === 1) {
                this._toastr.errorMessage("COMMON.RECORDS_NOT_DELETED");
              } else {
                this.doGetUserList();
              }
            },
            error: (e) => {
              this._toastr.errorMessage("COMMON.RECORDS_NOT_DELETED");
            },
          });
      }
    });
  }



  openImagefile(record:any){

    if(record.length > 0){

      this._spinner.show();
      this._worklogService
        .downloadFile(record)
        .pipe(
          finalize(() => {
            this._spinner.hide();
          })
        )
        .subscribe({
          next: (res) => {
            Swal.fire({
              imageUrl: res.path,
              showConfirmButton: false,
              showCloseButton: true,
              imageHeight: 500,
              imageAlt: 'Verification Image'
            })
          },
          error: (err) => {
            if ((err.status && err.status !== 401) || !err.status) {
              this._toastr.errorMessage("COMMON.SERVER_ERROR");
            }
          },
        });


    }else{
      Swal.fire({
        imageUrl: 'assets/images/users/blank.png',
        showConfirmButton: false,
        showCloseButton: true,
        imageHeight: 500,
        imageAlt: 'Verification Image'
      })
    }

  }
}
