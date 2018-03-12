import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs/Observable'
import { User } from '../models/user.model'
import { Http } from '@angular/http'
import { reject } from 'q'
@Injectable()
export class AuthService {
  private user: Observable<firebase.User>
  private authState: any
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private http: Http,
    private router: Router
  ) {
    this.user = afAuth.authState
  }
  currentUserId(): string {
    return this.authState !== null ? this.authState.uid : ' '
  }
  login(email: string, password: string) {
    // return this.afAuth.auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then(resolve => {
    //     const status = 'online'
    //     this.setUserStatus(email, status)
    //     resolve()
    //     // this.router.navigate(['chat'])
    //   })
    //   .catch(error => {
    //     console.log('er-------ror', error)
    //     reject(error)
    //     this.router.navigate(['login'])
    //   })
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(fbUser => {
          // if (fbUser.emailVerified === false) {
          //   reject({
          //     message: 'Email is not verified.'
          //   })
          // } else {
          //   const userData = {
          //     email: fbUser.email,
          //     uid: fbUser.uid
          //   }
          //   this.store.dispatch(new LoadLoggedInFirebaseUser(userData))
          resolve(fbUser.uid)
          // }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  signup(email: string, password: string, displayName: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          this.authState = user
          const status = 'online'
          this.setUserData(email, displayName, status)
          resolve(user)
        })
        .catch(error => reject(error))
    })
  }
  setUserData(email: string, displayName: string, password: string): void {
    const path = `users/${this.currentUserId()}`
    const data = {
      email: email,
      displayName: displayName,
      status: status
    }
    this.db
      .object(path)
      .update(data)
      .catch(error => console.log(error))
  }
  setUserStatus(id: string, status: string): void {
    const path = `users/${id}`
    const data = {
      status: status
    }
    this.db
      .object(path)
      .update(data)
      .catch(error => console.log(error))
  }
  // setStatus(email: string, status: string): void {
  //   const path = `users/${this.currentUserId()}`
  //   const data = {
  //     status: status
  //   }
  // }
  authUser() {
    return this.user
  }

  // linkPreview() {
  //   // console.log('====', link)
  //   let link = 'https://www.npmjs.com/package/wdt-emoji-bundle'
  //   var linkPreviewHelper = require('linkPreview')
  //   linkPreviewHelper.parse(link).subscribe(data => {
  //     console.log('LINK preview', data)
  //   })
  // }
  logout(): void {
    // sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    this.router.navigateByUrl('/')
  }
  getToken(): string {
    return sessionStorage.getItem('user')
  }
  getUser(): object {
    return JSON.parse(sessionStorage.getItem('user'))
  }
  setUser(user: object): void {
    sessionStorage.setItem('user', JSON.stringify(user))
  }
  isLoggedIn(): boolean {
    if (this.getToken()) {
      return true
    } else {
      return false
    }
  }
}
