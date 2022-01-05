import { Component } from '@angular/core'
import { AuthService } from '@app/services/auth.service'

@Component({
  selector: 'cui-topbar-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class TopbarProfileMenuComponent {
  firstname: string;
  lastname: string;
  role: string[];

  constructor(private authService: AuthService) {
    this.firstname = this.authService.getUserFirstname();
    this.lastname = this.authService.getUserLastname();
    this.role = [];
    let roles = this.authService.getRolesObject();
    for (let i of Object.keys(roles)) {
        this.role.push(roles[i]);
    }
  }

  logout() {
    this.authService.SignOut();
  }
}
