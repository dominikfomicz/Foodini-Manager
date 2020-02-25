import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  mainUrl = 'http://repo.foodini.net.pl/';
  httpOptions = {};

  getDataByPost(url: String, post_data: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.auth.getToken(),
      'Content-Type': 'application/json;charset=utf-8'
      })
    };
  return this.http.post(this.mainUrl + url, post_data, this.httpOptions).pipe((data => {
    return data;
  }),
    catchError(error => {
      if (error.status === 401) {
        this.showError(error.statusText);
      } else if (error.status === 404) {
        this.showError(error.statusText);
      } else if (error.staatus === 500) {
        this.showError(error.statusText);
      } else {
        this.showError(error.statusText);
      }
        return throwError(error);
    })
  );
  }

  getDataByGet(url: String) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.getToken(),
        'Content-Type': 'application/json;charset=utf-8'
      })
    };

    return this.http.get(this.mainUrl + url, this.httpOptions).pipe((data => {
          return data;
    }),
        catchError(error => {
          if (error.status === 401) {
            this.showError(error.statusText);
          } else if (error.status === 404) {
            this.showError(error.statusText);
          } else if (error.status === 500) {
            this.showError(error.statusText);
          } else {
            this.showError(error.statusText);
          }
          return throwError(error);
        })
    );
  }

  selectItem(app_list_string){
    return this.getDataByPost('tools/getList', {app_list_string: app_list_string});
  }

  showError(message) {
    this.auth.signout();
  }
}
