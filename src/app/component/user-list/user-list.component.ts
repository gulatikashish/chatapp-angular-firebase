import { Component, OnInit } from '@angular/core'
import { ChatService } from '../../services/chat.service'
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users
  constructor(private chatService: ChatService, private authService: AuthService) {}
  public loggedInEmail
  public loggedInData

  ngOnInit() {
    this.loggedInData = this.authService.authUser()
    this.loggedInData.subscribe(user => {
      if (user) {
        this.loggedInEmail = user.email
      }
    })
    this.chatService.getUsers().subscribe(data => {
      this.users = data
      this.users.filter((data, i) => {
        if (data.email === this.loggedInEmail) {
          this.users.splice(i, 1)
        }
      })
      return data
    })

    // .subscribe(response => {})
    // console.log('useaaarsss', this.users)
  }
}
