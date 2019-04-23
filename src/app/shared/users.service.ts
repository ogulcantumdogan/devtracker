import {User} from './user.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UsersService {
  public users: User[] = [];
  public usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<{message: string, result: User[]}>('http://localhost:2000/users') // result: User[] mi döndüreceğiz?
      .subscribe((userData) => {
        this.users = userData.result;
        this.usersUpdated.next([...this.users]);
        console.log(userData.message);
      });
  }

  getUsersUpdateListener(){
    return this.usersUpdated.asObservable();
  }

 getUserById(id: number){
  console.log('users.service getuserbyid geldi');
  return this.http.get<{message: string, result: User}>('http://localhost:2000/users/' + id);

   // .subscribe((responseData) => {
      // console.log(responseData.message);
      // this.users.push(user);
      // this.usersUpdated.next([...this.users]);
 }

  addUser(user: User) {
    return this.http.post('http://localhost:2000/users/', user);
  }

  deleteUser(id: number){
    return this.http.delete('http://localhost:2000/users/' +  id);

    // .subscribe((responseData) => {
      // console.log(responseData.message);
      // this.users.push(user);
      // this.usersUpdated.next([...this.users]);
  }



  editUser(user: User){
    return this.http.put<User>('http://localhost:2000/users/' + user.id, user);
  }

}
