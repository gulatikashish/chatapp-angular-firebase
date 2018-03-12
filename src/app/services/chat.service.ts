import { Injectable } from '@angular/core'
import {} from 'angularfire2'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Observable'
import { ChatMessage } from '../models/chat-message.model'
import { AuthService } from '../services/auth.service'
import * as firebase from 'firebase/app'
import { FirebaseListObservable } from 'angularfire2/database-deprecated'
@Injectable()
export class ChatService {
  user: firebase.User
  chatMessages: any
  chatMessage: ChatMessage
  displayName: Observable<string>
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth
      }
      this.getUser().subscribe(a => {
        this.displayName = a.displayName
      })
    })
  }
  getUser(): Observable<any> {
    const userId = this.user.uid
    const path = `/users/${userId}`
    return this.db.object(path).valueChanges()
  }
  getUsers() {
    return this.db.list('users').valueChanges()
  }
  sendMessage(msg: string) {
    const timestamp = this.getTimestamp()
    // const email = this.user.email
    this.chatMessages = this.getMessage()
    // this.chatMessages.push({
    //   message: msg,
    //   timeSent: timestamp,
    //   userName: 'this.userName',
    //   email: email
    // })
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      displayName: this.displayName,
      email: this.user.email
    })
  }
  getMessages() {
    return this.db
      .list('messages', ref => {
        let q = ref.limitToLast(10)
        return q
      })
      .valueChanges()

    //db.list('/items', ref => ref.orderByChild('size').equalTo('large'))
  }
  getMessage() {
    return this.db.list('messages', ref => {
      return ref.limitToLast(10)
    })
  }
  getTimestamp() {
    const now = new Date()
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate()
    const time = now.getUTCHours() + 1 + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds()
    return date + ' ' + time
  }
}
