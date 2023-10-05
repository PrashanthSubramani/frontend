import { Component, OnInit,Input } from '@angular/core';


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
constructor() {}

ngOnInit(): void {

}
}
