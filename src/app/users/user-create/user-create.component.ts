import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../shared/users.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(public usersService: UsersService, private router: Router ) {}

  onAddUser(form: NgForm){
    if (form.invalid){
      return;
    }
    const user: User = {
      id: null,
      eMail: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      password: form.value.password
    }
    this.usersService.addUser(user).subscribe((responseData) => {
      console.log(responseData);
      this.usersService.users.push(user);
      this.usersService.usersUpdated.next([...this.usersService.users]);
      form.resetForm();
      this.router.navigateByUrl('users');
    }, error => console.log(error));
  }

  ngOnInit() {
  }

}
