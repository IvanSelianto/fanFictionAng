import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class UserService {
  constructor(private http: HttpClient) {
  }

  getAllUsers() {
    return this.http.get(API_URL + 'allusers');
  }

  deleteUser(userId) {
    return this.http.delete(API_URL + 'deleteuser/' + userId);
  }

  blockUser(userId) {
    return this.http.get(API_URL + 'blockuser/' + userId);
  }

  setUserRole(userId) {
    return this.http.get(API_URL + 'setuserrole/' + userId);
  }

  setAdminRole(userId) {
    return this.http.get(API_URL + 'setadminrole/' + userId);
  }

  getUserById(userId) {
    return this.http.get(API_URL + 'getuserbyid/' + userId);
  }

  editUsername(userId, editedName) {
    return this.http.post(API_URL + 'editusername', {
      userId,
      editedName
    }, httpOptions);
  }

}
