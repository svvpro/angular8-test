import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = null;

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{ token }> {
    return this.http.post<{token}>('/api/auth/login', user).pipe(
      tap(({token})=> {
        this.setToken(token);
      })
    );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }

  logout(): void {
    localStorage.clear();
    this.token = null;
  }

  getToken(): string {
    return this.token;
  }

  setToken(token: string): void {
    localStorage.setItem('token-key', token);
    this.token = token;
  }

  isAuth(): boolean {
    return !!this.token;
  }
}
