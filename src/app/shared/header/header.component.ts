import { Component } from '@angular/core';
import { UserService } from '../../core/service/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loggedUser: any;

  constructor( private user: UserService ) {
    this.user.getUser().subscribe(user => {
      this.loggedUser = user? JSON.parse(user): '';
    });
  }

  logout() {
    this.user.user_logout()
  }

}
