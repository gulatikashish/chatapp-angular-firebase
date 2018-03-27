import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core'
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef
  constructor(private authService: AuthService) {}
  public loggedInStatus
  public loggedId
  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight
  }

  ngAfterViewChecked() {
    this.scrollToBottom()
  }
  ngOnInit() {
    this.loggedId = this.authService.getUser()
    this.authService.setUserStatus(this.loggedId.id, 'online')
  }
}
