import { Component, OnInit,Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { LoginService } from 'src/app/pages/auth/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() sideNavStatus:boolean =true;

  list = [
  {
    number:'1',
    name:'Home',
    icon : 'fa fa-solid fa-home',
  },
  {
    number:'2',
    name:'Profile',
    icon : 'fa fa-solid fa-user',
  },
]
menu: any;
toggle: any = true;
menuItems: MenuItem[] = [];
@ViewChild('sideMenu') sideMenu!: ElementRef;
@Output() mobileMenuButtonClicked = new EventEmitter();

constructor(    public translate: TranslateService,
  private _loginService: LoginService) {
  translate.setDefaultLang('en');
}

ngOnInit(): void {
  // Menu Items
  let currentMenu = this._loginService.currentMenuValue;
  this.menuItems = currentMenu;
}

/***
 * Activate droup down set
 */
ngAfterViewInit() {
  this.initActiveMenu();
}

removeActivation(items: any) {
  items.forEach((item: any) => {
    if (item.classList.contains("menu-link")) {
      if (!item.classList.contains("active")) {
        item.setAttribute("aria-expanded", false);
      }
      (item.nextElementSibling) ? item.nextElementSibling.classList.remove("show") : null;
    }
    if (item.classList.contains("nav-link")) {
      if (item.nextElementSibling) {
        item.nextElementSibling.classList.remove("show");
      }
      item.setAttribute("aria-expanded", false);
    }
    item.classList.remove("active");
  });
}

toggleSubItem(event: any) {
  if (event.target && event.target.nextElementSibling)
    event.target.nextElementSibling.classList.toggle("show");
};

toggleItem(event: any) {
  let isCurrentMenuId = event.target.closest('a.nav-link');
  let isMenu = isCurrentMenuId.nextElementSibling as any;
  if (isMenu.classList.contains("show")) {
    isMenu.classList.remove("show");
    isCurrentMenuId.setAttribute("aria-expanded", "false");
  } else {
    let dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });
    (isMenu) ? isMenu.classList.add('show') : null;
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const iconItems = Array.from(ul.getElementsByTagName("a"));
      let activeIconItems = iconItems.filter((x: any) => x.classList.contains("active"));
      activeIconItems.forEach((item: any) => {
        item.setAttribute('aria-expanded', "false")
        item.classList.remove("active");
      });
    }
    isCurrentMenuId.setAttribute("aria-expanded", "true");
    if (isCurrentMenuId) {
      this.activateParentDropdown(isCurrentMenuId);
    }
  }
}

// remove active items of two-column-menu
activateParentDropdown(item: any) { // navbar-nav menu add active
  item.classList.add("active");
  let parentCollapseDiv = item.closest(".collapse.menu-dropdown");
  if (parentCollapseDiv) {
    //   // to set aria expand true remaining
    parentCollapseDiv.classList.add("show");
    parentCollapseDiv.parentElement.children[0].classList.add("active");
    parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
    if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
      parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
      if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
        parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
    }
    return false;
  }
  return false;
}

updateActive(event: any) {
  const ul = document.getElementById("navbar-nav");
  if (ul) {
    const items = Array.from(ul.querySelectorAll("a.nav-link"));
    this.removeActivation(items);
  }
  this.activateParentDropdown(event.target);
}

initActiveMenu() {
  const pathName = window.location.pathname;
  const ul = document.getElementById("navbar-nav");
  if (ul) {
    const items = Array.from(ul.querySelectorAll("a.nav-link"));
    let activeItems = items.filter((x: any) => x.classList.contains("active"));
    this.removeActivation(activeItems);

    let matchingMenuItem = items.find((x: any) => {
      return x.pathname === pathName;
    });
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }
} 

/**
 * Returns true or false if given menu item has child or not
 * @param item menuItem
 */
hasItems(item: MenuItem) {
  return item.subItems !== undefined ? item.subItems.length > 0 : false;
}

/**
 * Toggle the menu bar when having mobile screen
 */
toggleMobileMenu(event: any) {
  var sidebarsize = document.documentElement.getAttribute("data-sidebar-size");
  if (sidebarsize == 'sm-hover-active') {
    document.documentElement.setAttribute("data-sidebar-size", 'sm-hover')
  } else {
    document.documentElement.setAttribute("data-sidebar-size", 'sm-hover-active')
  }
}

/**
 * SidebarHide modal
 * @param content modal content
 */
 SidebarHide() {
  document.body.classList.remove('vertical-sidebar-enable');
}

}
