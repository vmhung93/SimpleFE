import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authenticationToken = this.authenticationService.getAuthorizationToken();

    if (authenticationToken !== null) {
      // Clone the request and set the new header in one step.
      const authenticationReq = req.clone({
        setHeaders: { Authorization: `Bearer ${authenticationToken}` },
      });

      // Send cloned request with header to the next handler.
      return next.handle(authenticationReq);
    }

    // Send current request (without token) to the next handler
    return next.handle(req);
  }
}
