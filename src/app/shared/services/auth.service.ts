import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { of, BehaviorSubject } from "rxjs";
import { delay } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);
  userStatus = new BehaviorSubject(0);
  httpOptions = {};

  constructor(
    private store: LocalStoreService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService) {
    this.checkAuth();
  }

  checkAuth() {
    if(this.getToken() != null){
      this.authenticationState.next(true);
      this.router.navigateByUrl('#');
    } else {
      this.authenticationState.next(false);
    }
  }

  getuser() {
    return of({});
  }

  getToken() {
    return localStorage.getItem('token');
  }

  signin(credentials) {
    const post_data = new HttpParams()
    .set('username', credentials.email)
    .set('password', credentials.password)
    .set('client_id', '1')
    .set('client_secret', 'wYp5wj6LRF6zE8M2DAQofcOUAc7JHeGVlFF5P8au')
    .set('scope', '')
    .set('grant_type', 'password');

    this.http.post('http://repo.foodini.net.pl/oauth/token', post_data, this.httpOptions).subscribe(
      (data) => {
        if (data && data['access_token']) {
          localStorage.setItem('token', data['access_token']);
          this.authenticationState.next(true);

          const post_data = new HttpParams().set('uuid', credentials.email);
          this.http.post('http://repo.foodini.net.pl/auth-api/getUserStatus', post_data, this.httpOptions).subscribe(data => {
            if (data === -1) {
              localStorage.setItem('user_status', '-1');
              this.userStatus.next(-1);
            }
            if (data === 0) {
              localStorage.setItem('user_status', '0');
              this.userStatus.next(0);
            }
            if (data === 1) {
              localStorage.setItem('user_status', '1');
              this.userStatus.next(1);
            }
            if (data === 2) {
              localStorage.setItem('user_status', '2');
              this.userStatus.next(2);
            }
            if (data === 3) {
              localStorage.setItem('user_status', '3');
              this.userStatus.next(3);
            }
          });
        }
      },
      err => {
        of({}).pipe(delay(1500)).subscribe(res => 
          this.toastr.error(err.message, 'Błąd', { timeOut: 3000, closeButton: true, progressBar: true }));
      });
      return of({}).pipe(delay(1500));

  }
  signout() {
    this.authenticationState.next(false);
    this.store.clear();
    this.router.navigateByUrl('/sessions/signin');
  }
}
