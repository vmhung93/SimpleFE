import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user';

import { environment } from '../../environments/environment';

const baseUserUrl = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<User[]>(baseUserUrl);
  }

  findById(id: string) {
    return this.http.get<User>(`${baseUserUrl}/${id}`);
  }

  getDummyData() {
    return this.http.get(`https://randomuser.me/api/`);
  }
}
