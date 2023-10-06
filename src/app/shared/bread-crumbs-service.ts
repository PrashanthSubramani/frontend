import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from 'src/app/i18n/translation.service';
import { AppCommonService } from './app-common.service';
import { LoginService } from '../pages/auth/login.service';

@Injectable()
export class BreadCrumbsService {
  constructor(
    private _httpClient: HttpClient,
    private _translationService: TranslationService,
    private _router : Router,
    private _loginService: LoginService,
    private _appCommonService: AppCommonService,
  ) {

  }

  doGetPageDetails()
  {


    const module_icons = this._appCommonService.module_icons;

    var url = this._router.url.toString().substring(1);

    if(url === 'hk/sanctions/sanctions_ae'){
      url = 'hk/sanctions';
    }


    var menu_generate_data = this._loginService.menu_generate_data;


    let page = menu_generate_data['pages'].filter(data => data['file_path'] === url)[0];

    var module_id: number = 0;
    if(!page)
    {
      var tmp_rec = this._loginService.updateMenuGenerateData;

      page = tmp_rec.filter(data => data['file_path'] === url)[0];

      module_id = page['module_id'];
    } else {
      module_id = page['module_id'];
    }

    const module = menu_generate_data['modules'].filter(data => data['module_id'] === module_id)[0];

    var icon_name = (module['module_icon'] <= 36) ? module_icons[module['module_icon'] - 1].name : module_icons[0].name;

    let module_name = this._translationService.getInstantValue(`NAV.MODULES.${module['short_name']}`.toUpperCase());
    if (module_name === `NAV.MODULES.${module['short_name']}`.toUpperCase()) {
      module_name = module['module_name'];
    }

    let page_name = this._translationService.getInstantValue(`NAV.PAGES.${page['page_name']}`.toUpperCase());
    if (page_name === `NAV.PAGES.${page['page_name']}`.toUpperCase()) {
      page_name = page['description'];
    }

    let chk_permission = menu_generate_data['menu_items'].filter(data => data['module_id'] === module_id &&
      data['page_id'] === page['page_id']
    );

    if (chk_permission.length === 0) {
      chk_permission = menu_generate_data['menu_items'].filter(data => data['module_id'] === module_id);
    }

    var module_based_menu = this._loginService.getModuleBasedGenerateData;

    var bc_page = module_based_menu.filter(data => data['page_link'] === url)[0];

    var bc_group_module_name = undefined;
    var bc_module_name = undefined;
    var bc_catalog_name = undefined;
    var bc_page_name = undefined;
    if(bc_page)
    {
      if (bc_page['g_module_name']) bc_group_module_name = (bc_page['g_module_translate']) ? this._translationService.getInstantValue(`${bc_page['g_module_name']}`.toUpperCase()) : bc_page['g_module_name'];
      if (bc_page['module_name']) bc_module_name = (bc_page['module_translate']) ? this._translationService.getInstantValue(`${bc_page['module_name']}`.toUpperCase()) : bc_page['module_name'];
      if (bc_page['sub_module_name']) bc_catalog_name = (bc_page['sub_module_translate']) ? this._translationService.getInstantValue(`${bc_page['sub_module_name']}`) : bc_page['sub_module_name'];
      if (bc_page['page_name']) bc_page_name = (bc_page['page_translate']) ? this._translationService.getInstantValue(`${bc_page['page_name']}`.toUpperCase()) : bc_page['page_name'];
    }

    return {
      icon: icon_name,
      module_name: module_name,
      page_name: page_name,
      permission: this.getPermission(chk_permission[0]),

      bc_group_module_name: bc_group_module_name,
      bc_module_name: bc_module_name,
      bc_catalog_name: bc_catalog_name,
      bc_page_name: bc_page_name,
      bc_page_link: url,
    };
  }

  doGetReportDetails() {
    const module_icons = this._appCommonService.module_icons;

    const url = this._router.url.toString().substring(1);

    var menu_generate_data = this._loginService.menu_generate_data;

    let page = menu_generate_data['report_pages_all'].filter(data => data['file_path'] === url)[0];

    var module_id: number = 0;
    if (!page) {
      var tmp_rec = this._loginService.updateMenuGenerateData;

      page = tmp_rec.filter(data => data['file_path'] === url)[0];
      module_id = page['module_id'];
    } else {
      module_id = page['module_id'];
    }

    const module = menu_generate_data['report_modules'].filter(data => data['module_id'] === module_id)[0];

    var icon_name = (module['module_icon'] <= 36) ? module_icons[module['module_icon'] - 1].name : module_icons[0].name;

    let module_name = this._translationService.getInstantValue(`NAV.MODULES.${module['short_name']}`.toUpperCase());
    if (module_name === `NAV.MODULES.${module['short_name']}`.toUpperCase()) {
      module_name = module['module_name'];
    }

    let page_name = this._translationService.getInstantValue(`NAV.PAGES.${page['page_name']}`.toUpperCase());
    if (page_name === `NAV.PAGES.${page['page_name']}`.toUpperCase()) {
      page_name = page['description'];
    }

    var report_id = page['report_id'];
    var report_name = page['page_name'];


    return {
      icon: icon_name,
      module_name: module_name,
      page_name: report_name,//page_name,
      permission: {},//this.getPermission(chk_permission[0]),
      report_id: report_id,
      report_name: report_name,
    };
  }

  getPermission(rec) {
    var allow_for_test = false;
    var permission = {};

    if (allow_for_test)
    {
      permission = {
        enabled: true,
        insert: true,
        update: true,
        delete: true,
        export: true,
        addon: true,
      };
    } else {
      permission = {
        enabled: (rec && rec['enabled_flag'] === 'Y') ? true : false,
        insert: (rec && rec['insert_allowed'] === 'Y') ? true : false,
        update: (rec && rec['update_allowed'] === 'Y') ? true : false,
        delete: (rec && rec['delete_allowed'] === 'Y') ? true : false,
        export: (rec && rec['export_allowed'] === 'Y') ? true : false,
        addon: (rec && rec['addon_allowed'] === 'Y') ? true : false,
      };
    }

    return permission;
  }
}
