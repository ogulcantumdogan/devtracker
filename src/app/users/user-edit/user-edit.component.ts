import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/shared/users.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  user: User = {
    id: null,
    eMail: null,
    firstName: null,
    lastName: null,
    password: null
  };

  user$: Observable<User> = of(this.user);
  constructor(private router: Router, private usersService: UsersService, private route: ActivatedRoute) {}


  onEditUser(form: NgForm) {
    const user: User = {
      id: +this.route.snapshot.paramMap.get('id'),
      eMail: form.value.eMail,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      password: form.value.password
    };

    this.usersService.editUser(user).subscribe(
      responseData => {
        console.log(responseData);
        this.router.navigateByUrl('users');
      },
      error => console.log(error)
    );
  }
  ngOnInit() {
    const urlId = +this.route.snapshot.paramMap.get('id');
    this.usersService.getUserById(urlId).subscribe((userData) => {this.user = userData.result; console.log('this.user',this.user)});


  }
}
