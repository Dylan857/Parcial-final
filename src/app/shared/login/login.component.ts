import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router){}

  readonly ROLE_ADMIN = "ROLE_ADMIN";
  readonly ROLE_USER = "ROLE_USER";

  formUser = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required)
  });

  get username() {
    return this.formUser.get('username');
  }

  get password() {
    return this.formUser.get('password');
  }

  loguearse() {
    let loginUser = this.formUser.value

    this.authService.loginUser(loginUser).subscribe(
      response => {
        localStorage.setItem('usuario', JSON.stringify(response.data[0]));
        if (response.data[0]['role'] == this.ROLE_ADMIN) {
          Swal.fire({
            title: 'Inicio de sesion correcto',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true
          });
          this.router.navigate(['/admin']);
        } else if (response.data[0]['role'] == this.ROLE_USER) {
          this.router.navigate(['/user']);
        }
      },
      error => {
        Swal.fire({
          title: error.error.message,
          icon: 'error',
        });
      }
    )
  }
}
