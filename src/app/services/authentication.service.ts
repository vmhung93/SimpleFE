import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../../app/models/user';

import { LOCAL_STORAGE } from '../constants/local-storage';
import { environment } from '../../environments/environment';

import { SignUpDto } from './dtos/auth/signup.dto';

const baseUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  private jwtHelperService;

  constructor(private router: Router, private http: HttpClient) {
    this.jwtHelperService = new JwtHelperService();

    this.userSubject = new BehaviorSubject<User>(this.getUser());
    this.user = this.userSubject.asObservable();
  }

  get currentUser(): User {
    return this.userSubject.value;
  }

  getAuthorizationToken() {
    return localStorage.getItem(LOCAL_STORAGE.Token);
  }

  isAuthenticated(): boolean {
    const token = this.getAuthorizationToken();
    return !this.jwtHelperService.isTokenExpired(token);
  }

  signIn(username: string, password: string) {
    return this.http
      .post<any>(
        `${baseUrl}/auth/sign_in`,
        { username, password },
        { withCredentials: true }
      )
      .pipe(
        map((data) => {
          localStorage.setItem(LOCAL_STORAGE.Token, data.token);
          localStorage.setItem(LOCAL_STORAGE.CurrentUser, JSON.stringify(data));

          this.userSubject.next(data);

          return data;
        })
      );
  }

  signUp(dto: SignUpDto) {
    return this.http.post<any>(`${baseUrl}/auth/sign_up`, dto);
  }

  logout() {
    localStorage.removeItem(LOCAL_STORAGE.Token);
    localStorage.removeItem(LOCAL_STORAGE.CurrentUser);

    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Get user from local storage
   */
  private getUser() {
    let user = null;

    try {
      user = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CurrentUser));
    } catch (e) {
      return null;
    }

    return user;
  }
}
