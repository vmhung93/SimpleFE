import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';

export class LoginModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  submitted = false;

  returnUrl: string;

  loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.returnUrl = '/users';
  }

  onSubmit() {
    this.submitted = true;

    const { userName, password } = this.loginForm.value;

    this.authenticationService
      .signIn(userName, password)
      .pipe(first())
      .subscribe({
        next: (user) => {
          // If the user login successful then redirect user to return url
          this.router.navigate([this.returnUrl]);
        },
        error: (res) => {
          const error = res.error;

          switch (error.status) {
            case 401:
              this.toastService.showError(
                'Login failed: Your username or password is incorrect',
                error.message
              );

              break;
          }
        },
      })
      .add(() => (this.submitted = false));
  }
}
