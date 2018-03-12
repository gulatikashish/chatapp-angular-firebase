import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { SignupFormComponent } from './app/component/signup-form/signup-form.component'
import { LoginFormComponent } from './app/component/login-form/login-form.component'
import { ChatroomComponent } from './app/component/chatroom/chatroom.component'
import { CanActivateDashboard, CanActivateHome } from './app/services/authGuard.service'
export const appRoutes: Routes = [
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'chat', component: ChatroomComponent, canActivate: [CanActivateHome] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
