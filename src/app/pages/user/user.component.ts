import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';

import { User } from '../../models/user';

import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';

import { CreateUserDto } from '../../services/dtos/users/create-user.dto';

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
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
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

    const { firstName, lastName } = this.userForm.value;

    const dto: CreateUserDto = {
      firstName,
      lastName,
    };

    this.userService
      .create(dto)
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
}
