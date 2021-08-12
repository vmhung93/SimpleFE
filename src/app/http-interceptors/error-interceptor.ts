import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private toastService: ToastService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', errorResponse.message);
        }

        switch (errorResponse.status) {
          case 401:
            if (this.router.url !== '/login') {
              this.toastService.showError('Unauthorized');
              this.authService.logout();
            }
            break;

          case 403:
            this.toastService.showError('Forbidden');
            this.authService.logout();
            break;

          default:
            this.toastService.showError(
              'Something went wrong! Please check the log for more information.'
            );
        }

        return throwError({
          error: errorResponse.error,
          message: errorResponse.message,
        });
      })
    );
  }
}
