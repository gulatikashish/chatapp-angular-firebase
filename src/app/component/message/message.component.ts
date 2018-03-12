import { Component, OnInit, Input } from '@angular/core'
import { ChatService } from '../../services/chat.service'
import { AuthService } from '../../services/auth.service'
import { Observable } from 'rxjs/Observable'
import { ChatMessage } from '../../models/chat-message.model'
import { AngularFireDatabase } from 'angularfire2/database'
import { FirebaseListObservable } from 'angularfire2/database-deprecated'
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage
  userEmail: string
  displayName: string
  messageContent: string
  timeStamp: Date = new Date()
  isOwnMessage = false
  userData = null
  constructor(private authService: AuthService) {}
  getInnerHTML(text) {
    // console.log('tstststststs', text)
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
    // this.authService.linkPreview().subscribe(response => {
    //   console.log('=============================================', response)

    // })
    // if (text && /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi.test(text)) {
    //   console.log('-------------------------------', text)
    // }
    return text.replace(exp, `<a href='$1' target='__blank'>$1</a><p></p>`)
  }
  ngOnInit(ChatMessage = this.chatMessage) {
    this.messageContent = ChatMessage.message
    this.timeStamp = ChatMessage.timeSent
    this.userEmail = ChatMessage.email
    this.displayName = ChatMessage.displayName
    this.userData = this.authService.getUser()
    console.log('-===========================--', this.userData.id)
    if (this.userData.email === this.userEmail) {
      this.isOwnMessage = true
    }
    // if (
    //   ChatMessage.message &&
    //   /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi.test(ChatMessage.message)
    // ) {

    //   // this.authService.linkPreview(this.chatMessage).subscribe(response => {
    //   //   // console.log('=============================================', response)
    //   //   // this.messageContent = `${this.messageContent} ${response}`
    //   // })
    // }
  }
}
