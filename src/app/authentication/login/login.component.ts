import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user_data: any;
  password: string = '';
  email: string = '';
  constructor(
    public toaster: ToastrService,
    public service: LoginService,
    private router: Router
  ) {}
  ngOnInit() {
    this.password = '';
    this.email = '';
  }
  onLogin() {
    console.log(this.password.length, this.email.length);

    if (this.password.length === 0) {
      console.log('reached');

      this.toaster.error('Please enter the passowrd to proceed');
      return;
    }
    if (this.email.length === 0) {
      this.toaster.error('Please enter the email to proceed');
      return;
    }
    this.service
      .getLogin({
        email: this.email,
        password: this.password,
      })
      .subscribe((response) => {
        if (response.code === 200) {
          if (response.data.status === 'SUCCESS') {
            this.toaster.success(response.data.status);
            localStorage.setItem(
              'user',
              JSON.stringify({
                id: response.data.id,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                designation: response.data.designation,
              })
            );
            this.router.navigate(['/home/Projects']);
          } else this.toaster.error(response.data.status);
        } else {
          this.toaster.error(response.message);
        }
      });
  }
}
