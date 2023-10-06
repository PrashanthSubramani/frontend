import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/account/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus:boolean =true; 
  currentUser = this.authService.currentAcUserValue;
  constructor(private authService: AuthenticationService){}
  ngOnInit():void{
    console.log(this.currentUser);
  }

  SideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  logout() {
    this.authService.logout()
      .subscribe(
        res => {
          if (res['error'] === 1) {
          } else {

          }
        },
        error => {
        });
  }    

}
