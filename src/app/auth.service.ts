import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {retry,catchError} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IUser } from './Users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _url = "./assets/data/users.json";

  constructor(private http:HttpClient) { }

  loginUser():Observable<IUser>{
    return this.http.get<IUser>(this._url).pipe(retry(1),catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error.message||"Server Error");
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }
}
