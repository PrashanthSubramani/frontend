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
  constructor(private authService: AuthenticationService){}
  ngOnInit():void{}

  SideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  logout() {
    // this.auth.logout();
    // document.location.reload();
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
