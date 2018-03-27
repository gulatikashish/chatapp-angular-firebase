import { Component, OnInit, OnChanges } from '@angular/core'
import { FirebaseListObservable } from 'angularfire2/database-deprecated'
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase } from 'angularfire2/database'
import { ChatService } from '../../services/chat.service'
import { MessagingService } from '../../services/messaging.service'
import { ChatMessage } from '../../models/chat-message.model'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: Observable<any>
  message

  constructor(private chat: ChatService, private msgService: MessagingService) {}
  ngOnChanges() {
    this.feed = this.chat.getMessages()
  }
  ngOnInit() {
    this.feed = this.chat.getMessages()
    this.msgService.getPermission()
    this.msgService.receiveMessage()
    this.message = this.msgService.currentMessage
    console.log('CURRENT MSG  ', this.message)
  }
}
