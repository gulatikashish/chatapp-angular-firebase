import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { EmojiPickerModule } from 'ng-emoji-picker'
import { NgxSlackModule } from 'ngx-slack'

import { AppComponent } from './app.component'
import { ChatFormComponent } from './component/chat-form/chat-form.component'
import { ChatroomComponent } from './component/chatroom/chatroom.component'
import { FeedComponent } from './component/feed/feed.component'
import { MessageComponent } from './component/message/message.component'
import { LoginFormComponent } from './component/login-form/login-form.component'
import { SignupFormComponent } from './component/signup-form/signup-form.component'
import { NavbarComponent } from './component/navbar/navbar.component'
import { UserListComponent } from './component/user-list/user-list.component'
import { UserItemComponent } from './component/user-item/user-item.component'
import { appRoutes } from '../routes'
import { AuthService } from './services/auth.service'
import { ChatService } from './services/chat.service'
import { environment } from '../environments/environment'
import { HttpModule, JsonpModule } from '@angular/http'
import { CanActivateDashboard, CanActivateHome } from '../app/services/authGuard.service'
@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavbarComponent,
    UserListComponent,
    UserItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    EmojiPickerModule,
    HttpModule,
    NgxSlackModule.initializeApp('https://hooks.slack.com/services/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')
  ],
  providers: [AuthService, ChatService, CanActivateDashboard, CanActivateHome],
  bootstrap: [AppComponent]
})
export class AppModule {}
