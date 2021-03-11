import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(public router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    
    const authToken=localStorage.getItem('token');
    if(authToken)
    {
    console.log(authToken);
   const clone= request.clone({
      
     setHeaders:{"authorization":authToken},
     
      
    });
    return next.handle(clone);

  }

    return next.handle(request);
  }

}



