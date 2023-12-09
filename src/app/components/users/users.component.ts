import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  users: User[] = [];  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  goToEditUser(userId: string) {
    this.router.navigate(['/edit-user', userId]);
  }


  getUsers() {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response.data
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      (response: any) => {
        Swal.fire({
          title: 'Se elimino correctamente el usuario',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true
        });
        this.getUsers();
      })
  }
}
