import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent,
  HttpInterceptor as AngularHttpInterceptor,
} from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from "rxjs/operators";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

// import { AuthService } from "@app/services/auth.service";

export class HttpRequestInterceptor implements AngularHttpInterceptor {
  // constructor(private authService: AuthService) {
  // }

  /**
   * Custom method to set Authorization in hearder request
   * @param req
   * @param token
   * @returns
   */
  addBearerToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }})
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (this.authService.isLoggedIn()) {
    //   return next.handle(this.addBearerToken(req, localStorage.getItem("access_token")));
    // }

    return next.handle(req).pipe(

    );
  }
}
