import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import swal from 'sweetalert'
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email: string
  password: string
  errMsg: string
  constructor(private authService: AuthService, private router: Router) {}
  login() {
    const email = this.email
    const password = this.password
    // const displayName = this.displayName
    this.authService
      .login(email, password)
      .then(data => {
        let set = {
          id: data,
          email: email
        }
        this.authService.setUser(set)
        this.router.navigateByUrl('/chat')
      })
      .catch(error => {
        swal(error.message, 'error', 'error')
      })
  }

  ngOnInit() {}
}
