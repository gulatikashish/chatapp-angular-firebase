import { Component, OnInit, OnChanges } from '@angular/core'
import { ChatService } from '../../services/chat.service'
import { Observable } from 'rxjs/Observable'
import { ChatMessage } from '../../models/chat-message.model'
import { AngularFireDatabase } from 'angularfire2/database'
import { FirebaseListObservable } from 'angularfire2/database-deprecated'
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: Observable<any>
  constructor(private chat: ChatService) {}
  ngOnChanges() {
    this.feed = this.chat.getMessages()
  }
  ngOnInit() {
    this.feed = this.chat.getMessages()
  }
}
