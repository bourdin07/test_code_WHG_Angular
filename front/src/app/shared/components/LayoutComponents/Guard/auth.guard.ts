import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { AuthService } from '@app/services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let hasRole = false;

    if (this.authService.getToken()) {
      for (let r of this.authService.getRoles()) {
        if (!next.data.roles || next.data.roles.indexOf(r) > -1) {
          hasRole = true;
        }
      }

      if (!hasRole) {
        this.router.navigate(['home']);

        return false;
      }
    }

    if (!hasRole) {
      this.router.navigate(['user/login']);

      return false;
    }

    return true;
  }
}
