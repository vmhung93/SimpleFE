import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';

import { User } from '../../models/user';

import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';

import { SignUpDto } from '../../services/dtos/auth/signup.dto';
import { ROLE } from 'src/app/constants/roles';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
})
export class UserComponent implements OnInit, AfterViewInit {
  users: User[];

  isLoading = false;
  submitted = false;
  noResult = false;

  userForm = this.formBuilder.group({
    userName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
  });

  get userName() {
    return this.userForm.get('userName');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get password() {
    return this.userForm.get('password');
  }

  refreshEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    merge(this.refreshEvent)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;

          return this.userService.findAll();
        }),
        catchError(() => {
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe((data) => {
        this.users = data;

        this.isLoading = false;

        if (this.users == null || this.users.length <= 0) {
          this.noResult = true;
        } else {
          this.noResult = false;
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;

    const { userName, firstName, lastName, password } = this.userForm.value;

    const dto: SignUpDto = {
      userName,
      firstName,
      lastName,
      password,
    };

    this.authService
      .signUp(dto)
      .pipe(first())
      .subscribe(() => {
        this.toastService.showSuccess('Add user successful');
        this.refreshEvent.emit();
        this.userForm.reset();
      })
      .add(() => (this.isLoading = false));
  }

  logout() {
    this.authService.logout();
  }

  getRole(userRole) {
    switch (userRole) {
      case ROLE.Admin:
        return 'Admin';
      default:
        return 'User';
    }
  }
}
