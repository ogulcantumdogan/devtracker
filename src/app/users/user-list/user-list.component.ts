import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { UsersService } from '../../shared/users.service';
import { Subscription } from 'rxjs';
import { checkAndUpdateElementDynamic } from '@angular/core/src/view/element';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  private usersSub: Subscription;

  onDelete(id: number){
    if (confirm('Are you sure to delete user with id:' + id + '?')) {
    this.usersService.deleteUser(id).subscribe(() => this.usersService.getUsers()
    ); }

  }

  onEditUser(id){
   this.usersService.editUser(id).subscribe(() => this.usersService.getUserById(id));
  } // Bunu neden yazdım hatırlamıyorum

  constructor(public usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers();
    this.usersSub = this.usersService.getUsersUpdateListener().subscribe((users: User[]) => this.users = users);
  }

  ngOnDestroy(){
    this.usersSub.unsubscribe();
  }
}
