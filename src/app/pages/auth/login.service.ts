import { Injectable, NgZone } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { TranslationService } from 'src/app/i18n/translation.service';
import { AppCommonService } from '../../shared/app-common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentMenuSubject: BehaviorSubject<any>;
  public currentMenu: Observable<any>;

  logged_in: boolean = false;
  trigger_logout: boolean = false;

  public menu_generate_data:any;
  public update_menu_generate_data:any = [];

  public module_based_generate_data = [];
  module_icons: any = {};

  constructor(
    private _httpClient: HttpClient,
    private _zone: NgZone,
    private _translationService: TranslationService,
    private _appCommon: AppCommonService,
  ) {
    this.module_icons = this._appCommon.module_icons;

    this.logged_in = false;

    this.currentMenuSubject = new BehaviorSubject<any>(undefined);
    this.currentMenu = this.currentMenuSubject.asObservable();
  }

  public get currentMenuValue() {
    return this.currentMenuSubject.value;
  }

  public get MenuGenerateData() {
    return this.menu_generate_data;
  }

  public get updateMenuGenerateData() {
    return this.update_menu_generate_data;
  }

  public get getModuleBasedGenerateData() {
    return this.module_based_generate_data;
  }

  doAppendPageManual(record:any) {
    const strFilePath: string = record['file_path'];
    if (strFilePath.includes('simple_report')) {
      return this.doDefinePage(record['file_path']) + "/normal";
    } else {
      return this.doDefinePage(record['file_path'])
    }
  }

  doDefinePage(file_path: string) {
    return file_path;
  }

  doGetSubItems(pages:any, group_type:any) {
    var subItems:any = [];

    //Help to get list of page group details
    let page_group = [];
    let pageGroupCollapasableItem:any = [];

    let pageGroup = "";

    for (let index1 = 0; index1 < pages.length; index1++) {
      const element = pages[index1];

      if (element['page_group'] && `${element['page_group']}`.trim.toString() !== "") {
        const filterRecord = page_group.filter(data => data.name === element['page_group']);
        if (filterRecord.length === 0) {
          page_group.push({ name: element['page_group'], display_value: element['page_group'] });
          let translateLabel: string = `NAV.GROUPS.${element['page_group']}`.toUpperCase();
          let page_group_name = this._translationService.getInstantValue(translateLabel);
          let useTranslate: boolean = true;
          if (page_group_name === `NAV.GROUPS.${element['page_group']}`.toUpperCase()) {
            page_group_name = element['page_group'];
            useTranslate = false;
          }

          translateLabel = `NAV.GROUPS.${element['page_group']}`.toUpperCase();
          useTranslate = true;

          pageGroupCollapasableItem.push({
            label: translateLabel,//page_group_name,
            page_group: element['page_group'],
            useTranslate: useTranslate,
            subItems: [],
          });
        }
      }
    }

    pages.forEach((data:any) => {
      const element = data;

      let translateLabel: string = `NAV.PAGES.${element['page_name']}`.toUpperCase();
      let page_name = this._translationService.getInstantValue(translateLabel);
      let useTranslate: boolean = true;
      if (page_name === `NAV.PAGES.${element['page_name']}`.toUpperCase()) {
        page_name = element['description'];
        useTranslate = false;
      }

      if (group_type === 'RPT') {
        page_name = element['page_name'];
      }

      var link = element['file_path'];
      var report_id = undefined;
      if (group_type === 'RPT') {
        link = element['file_path'] + '/' + Math.floor(Math.random() * (new Date()).getTime());//this.doAppendPageManual(element);

        report_id = element['report_id'];
      }

      const item = {
        label: translateLabel,//page_name,
        link: link,//element['file_path'],
        useTranslate: useTranslate,
        translateLabel: translateLabel,
      };
      //subItems.push(item);

      //for page group data to set
      if (element['page_group'] && `${element['page_group']}`.trim.toString() !== "") {
        const idx = pageGroupCollapasableItem.findIndex((res:any) => res.page_group === element['page_group']);
        pageGroupCollapasableItem[idx]['subItems'].push(item);

        const grp_idx = subItems.findIndex((res:any) => res.page_group === element['page_group']);
        if (grp_idx > -1) {
          subItems['grp_idx'] = pageGroupCollapasableItem[idx];
        } else {
          subItems.push(pageGroupCollapasableItem[idx]);
        }
      } else {
        subItems.push(item);
      }

      const tmpItem = {
        module_id: element['module_id'],
        file_path: link,
        page_name: element['page_name'],
        page_id: element['page_id'],
        description: element['description'],
        report_id: report_id,
      }
      this.update_menu_generate_data.push(tmpItem);
    });

    return subItems;
  }


  doGetModuleMenus()
  {

    const data = this.menu_generate_data;

    this.update_menu_generate_data = [];
    var array_index = 0;

    let menu = [];

    let newNavItem = [];
    for (let index = 0; index < data.modules.length; index++) {
      const element = data.modules[index];

      // const item_order = element['item_order'];
      let translateLabel: string = '';
      if (element['g_module_id'] !== null)
      {
        translateLabel = `NAV.MODULES.${element['g_short_name']}`.toUpperCase();
      } else {
        translateLabel = `NAV.MODULES.${element['short_name']}`.toUpperCase();
      }
      let module_name = this._translationService.getInstantValue(translateLabel);

      let useTranslate: boolean = true;
      //if (module_name === `NAV.MODULES.${element['short_name']}`.toUpperCase()) {
      if (module_name === translateLabel) {
        if (element['g_module_id'] !== null)
        {
            module_name = element['g_module_name'];
        } else {
          module_name = element['module_name'];
        }
        useTranslate = false;
      }

      //const module_icon = this.module_icons[element.module_icon - 1].name;
      var module_icon = '';//this.module_icons[element.module_icon - 1].name;
      if (element['group_module'] && element['group_module'] !== null){
        module_icon = this.module_icons[element.g_module_icon - 1].name;
      } else {
        module_icon = this.module_icons[element.module_icon - 1].name;
      }

      // let pages;
      // pages = data.pages.filter(data => {
      //   return data.module_id === element['module_id'];
      // });

      // Prepare the new nav item
      const item = {
        icon: module_icon,
        id: element['module_id'],
        label: translateLabel,
        useTranslate: useTranslate,
        translateLabel: translateLabel,
        groupModule: (element['group_module'] && element['group_module'] !== null) ? +element['group_module'] : 0,
        is_group_module: (element['g_module_id'] !== null) ? true : false,
        group_id: (element['g_module_id'] !== null) ? element['g_module_id'] : 0,
        module_id: element['module_id'],
      };
      //item['subItems'] = this.doGetSubItems(pages, 'MOD');

      var is_exist: boolean = false;
      if (element['g_module_id'] !== null)
      {
        is_exist = (menu.filter(dt=> dt.group_id === item.group_id).length > 0 ) ? true : false;
      } else {
        is_exist = (menu.filter(dt => dt.module_id === item.module_id).length > 0) ? true : false;
      }

      if (!is_exist) menu.push(item);
    }

    return menu;
  }

  doUpdateSideBarMenu() {
    //if(this.logged_in === true)
    {
      const module_menu:any = this.doGetModuleMenus();

      // return;

      const data = this.menu_generate_data;

      this.update_menu_generate_data = [];
      var array_index = 0;

      let menu:any = [];

      //Title Header Its common
      let translateLabel: string = `NAV.APPLICATIONS`.toUpperCase();
      var item:any = {
        label: translateLabel,
        isTitle: true,
        useTranslate: true,
        translateLabel: translateLabel,
      };
      //menu.push(item);
      module_menu.unshift(item);

      let newNavItem = [];
      for (let index = 0; index < data.modules.length; index++) {
        const element = data.modules[index];

        // const item_order = element['item_order'];
        let translateLabel: string = `NAV.MODULES.${element['short_name']}`.toUpperCase();
        let module_name = this._translationService.getInstantValue(translateLabel);
        let useTranslate: boolean = true;
        if (module_name === `NAV.MODULES.${element['short_name']}`.toUpperCase()) {
          module_name = element['module_name'];
          useTranslate = false;
        }

        //const module_icon = this.module_icons[element.module_icon - 1].name;
        var module_icon = '';//this.module_icons[element.module_icon - 1].name;
        if (element['group_module'] && element['group_module'] !== null){
          module_icon = this.module_icons[element.g_module_icon - 1].name;
        } else {
          module_icon = this.module_icons[element.module_icon - 1].name;
        }

        let pages;
        pages = data.pages.filter((data:any) => {
          return data.module_id === element['module_id'];
        });

        // Prepare the new nav item
        const item:any = {
          icon: module_icon,
          id: element['module_id'],
          label: translateLabel,
          useTranslate: useTranslate,
          translateLabel: translateLabel,
          groupModule: (element['group_module'] && element['group_module'] !== null) ? +element['group_module'] : 0,
          group_id: (element['g_module_id'] !== null) ? element['g_module_id'] : 0,
        };
        item['subItems'] = this.doGetSubItems(pages, 'MOD');

        menu.push(item);
      }

      var bc_pages:any = [];
        module_menu.forEach((element:any) => {
          if (element['group_id'] !== null && element['group_id'] !== 0)
          {
            const fil_menus = menu.filter((fil_data:any) => fil_data.group_id === element['group_id']);
            var module_menu_idx = module_menu.indexOf(element);
            if (fil_menus.length > 0) {
              fil_menus.forEach((data:any) => {
                var menu_idx = menu.indexOf(data);
                menu.splice(menu_idx, 1);

                delete data['icon'];
              });

              fil_menus.forEach( (data:any) => {

                var menu_idx = fil_menus.indexOf(data);

                const subItems = data['subItems'];
                subItems.forEach((sub_data:any) => {

                  var sub_menu_idx = subItems.indexOf(sub_data);

                  if (sub_data['subItems']) {

                    fil_menus[menu_idx]['subItems'][sub_menu_idx]['childItem'] = sub_data['subItems'];

                    sub_data['subItems'].forEach((s_data:any) => {
                      var def_name:any = {};
                      def_name["g_module_name"] = element['label'];
                      def_name["g_module_translate"] = element['useTranslate'];
                      def_name["module_name"] = data['label'];
                      def_name["module_translate"] = data['useTranslate'];
                      def_name["sub_module_name"] = sub_data['label'];
                      def_name["sub_module_translate"] = sub_data['useTranslate'];


                      def_name["page_name"] = s_data['label'];
                      def_name["page_translate"] = s_data['useTranslate'];
                      def_name["page_link"] = s_data['link'];
                      bc_pages.push(def_name);
                    });
                  } else {
                    var def_name:any = {};
                    def_name["g_module_name"] = element['label'];
                    def_name["g_module_translate"] = element['useTranslate'];
                    def_name["module_name"] = data['label'];
                    def_name["module_translate"] = data['useTranslate'];


                    def_name["page_name"] = sub_data['label'];
                    def_name["page_translate"] = sub_data['useTranslate'];
                    def_name["page_link"] = sub_data['link'];
                    bc_pages.push(def_name);
                  }
                });
              });

              module_menu[module_menu_idx]['subItems'] = fil_menus;
            }
          } else {
            const fil_menus = menu.filter((fil_data:any) => fil_data.id === element['module_id']);
            var module_menu_idx = module_menu.indexOf(element);
            if (fil_menus.length > 0) {
              module_menu[module_menu_idx]['subItems'] = fil_menus[0]['subItems'];

              fil_menus.forEach((data:any) => {
                const subItems = data['subItems']
                subItems.forEach((sub_data:any) => {

                  if (sub_data['subItems']) {
                    sub_data['subItems'].forEach((s_data:any) => {
                      var def_name:any = {};
                      //def_name["g_module_name"] = element['label'];
                      //def_name["g_module_translate"] = element['useTranslate'];
                      def_name["module_name"] = data['label'];
                      def_name["module_translate"] = data['useTranslate'];

                      def_name["sub_module_name"] = sub_data['label'];
                      def_name["sub_module_translate"] = sub_data['useTranslate'];

                      def_name["page_name"] = s_data['label'];
                      def_name["page_translate"] = s_data['useTranslate'];
                      def_name["page_link"] = s_data['link'];
                      bc_pages.push(def_name);
                    });
                  }else {
                    var def_name:any = {};
                    //def_name["g_module_name"] = element['label'];
                    //def_name["g_module_translate"] = element['useTranslate'];
                    def_name["module_name"] = data['label'];
                    def_name["module_translate"] = data['useTranslate'];

                    def_name["page_name"] = sub_data['label'];
                    def_name["page_translate"] = sub_data['useTranslate'];
                    def_name["page_link"] = sub_data['link'];
                    bc_pages.push(def_name);
                  }
                });
              });
            }
          }
        });

      this.module_based_generate_data = bc_pages;


      this.currentMenuSubject.next(module_menu);
    }
  }

}
