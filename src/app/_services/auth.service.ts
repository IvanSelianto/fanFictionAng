import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'https://fanfictionback.herokuapp.com/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const authVKoptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Content-Type': 'application/jsonp'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    this.activate();
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  activate(): Observable<any> {
    return this.http.get(AUTH_API + 'activate/{code}');
  }

  authFromVk(vkCode: string): Observable<any> {
    return this.http.get(AUTH_API + 'authvk/' + vkCode);
  }

  authFromGoogle(googleCode: string): Observable<any>{
    return this.http.get(AUTH_API + 'authgoogle/' + googleCode.slice(2));

  }

}
