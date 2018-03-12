import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable()
export class CanActivateDashboard implements CanActivate {
  constructor(private userService: AuthService, private router: Router) {}
  canActivate() {
    const isUserLoggedIn = this.userService.isLoggedIn()
    if (!isUserLoggedIn) {
      this.router.navigateByUrl('/')
    }
    return isUserLoggedIn
  }
}

@Injectable()
export class CanActivateHome implements CanActivate {
  constructor(private userService: AuthService, private router: Router) {}
  canActivate() {
    const isUserLoggedIn = this.userService.isLoggedIn()
    if (!isUserLoggedIn) {
      this.router.navigateByUrl('/')
    }
    return isUserLoggedIn
  }
}
