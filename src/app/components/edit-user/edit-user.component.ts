import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  userId: string = '';

  constructor(private userService: UserService, 
    private router: Router, private route: ActivatedRoute){}


  roles: any[] = []
  countries: any[] = []
  cities: any[] = []
  
  

  formUser = new FormGroup({
    'id': new FormControl(''),
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
  });

  get firstName () {
    return this.formUser.get("firstName")
  }

  get middleName () {
    return this.formUser.get("middleName")
  }

  get lastName () {
    return this.formUser.get("lastName")
  }

  get secondSurname () {
    return this.formUser.get("secondSurname")
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

    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.userInformation(this.userId)
}

userInformation (userId: string) {
  this.userService.getUser(userId).subscribe(
    (response: any) => {
      console.log(response)
      this.formUser.get("id")?.setValue(userId)
      this.firstName?.setValue(response.data[0].firstName);
      this.middleName?.setValue(response.data[0].middleName);
      this.lastName?.setValue(response.data[0].lastName);
      this.secondSurname?.setValue(response.data[0].secondSurname);
      this.email?.setValue(response.data[0].email);
      this.phone?.setValue(response.data[0].phone);
      this.address?.setValue(response.data[0].address)
      this.cityId?.setValue(response.data[0].city)
      this.roleId?.setValue(response.data[0].role)
      this.countryId?.setValue(response.data[0].country)
    },
    (error) => {
      console.log(error.error);
    }
  )
}

editar() {
  let newUser = this.formUser.value

    this.userService.editUser(newUser.id!, newUser).subscribe(
      response => {
          Swal.fire({
            title: 'Se edito correctamente el usuario',
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
