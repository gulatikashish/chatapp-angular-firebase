import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { resolve } from 'url'
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  email: string
  password: string
  displayName: string
  errMsg: string
  constructor(private authService: AuthService, private router: Router) {}
  signUp() {
    const email = this.email
    const password = this.password
    const displayName = this.displayName
    this.authService
      .signup(email, password, displayName)
      .then(data => {
        this.router.navigateByUrl('/login')
      })
      .catch(error => {
        swal(error.message, 'error', 'error')
      })
  }
  ngOnInit() {}
}
