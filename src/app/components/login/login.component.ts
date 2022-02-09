import { Component } from '@angular/core';
import { ToastrService } from 'src/app/services/toastr.service';
import { AuthService } from '../../services/auth.service';

interface LoginData {
  userName: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  public login(loginData: LoginData): void {
    this.authService.login(loginData).subscribe((loginFailed: boolean) => {
      if (loginFailed) {
        this.toastrService.error('Invalid Credentials!', 'Please enter a valid username and password.')
      }
    })
  }
}
