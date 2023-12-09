import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {


  constructor(private userService: UserService, 
    private authService: AuthService, private router: Router){}

  roles: any[] = []
  countries: any[] = []
  cities: any[] = []
  
  

  formUser = new FormGroup({
    'firstName': new FormControl('', [Validators.required]),
    'middleName': new FormControl(''),
    'lastName': new FormControl('', [Validators.required]),
    'secondSurname': new FormControl(''),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'phone': new FormControl('', [Validators.required, Validators.pattern(/^3\d*$/)]),
    'address': new FormControl('', [Validators.required]),
    'roleId': new FormControl('', [Validators.required]),
    'cityId': new FormControl('', [Validators.required]),
    'countryId': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  get firstName () {
    return this.formUser.get("firstName")
  }

  get lastName () {
    return this.formUser.get("lastName")
  }

  get phone () {
    return this.formUser.get("phone")
  }

  get address () {
    return this.formUser.get("address")
  }

  get roleId () {
    return this.formUser.get("roleId")
  }

  get cityId () {
    return this.formUser.get("cityId")
  }

  get countryId () {
    return this.formUser.get("countryId")
  }

  get email() {
    return this.formUser.get('email');
  }

  get password() {
    return this.formUser.get('password');
  }

  ngOnInit(): void {
    this.userService.getRoles().subscribe(
      (response: any) => {
        this.roles = response.data        
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );
    this.userService.getCountries().subscribe(
      (response: any) => {        
        this.countries = response.data
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );

    this.userService.getCities().subscribe(
      (response: any) => {
        this.cities = response.data
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );
  }
  registrar() {
    let newUser = this.formUser.value

    this.authService.newUser(newUser).subscribe(
      response => {
          Swal.fire({
            title: 'Se creo correctamente el usuario',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true
          });
          this.router.navigate(['/users']);
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