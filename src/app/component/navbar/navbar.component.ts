import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { Observable } from 'rxjs/Observable'
import * as firebase from 'firebase/app'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>
  userEmail: string
  public loggedIn
  public loggedId
  constructor(private authService: AuthService) {}
  login() {
    this.loggedIn = this.authService.isLoggedIn()
  }
  logout() {
    this.loggedId = this.authService.getUser()
    this.authService.setUserStatus(this.loggedId.id, 'offline')
    this.authService.logout()
  }

  ngOnInit() {
    this.user = this.authService.authUser()

    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email
      }
    })
    this.loggedIn = this.authService.isLoggedIn()

    // this.authService.linkPreview()
  }
}
