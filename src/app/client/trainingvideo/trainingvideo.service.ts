import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiTokenService } from 'app/services/token.service';
import * as Constants from 'app/app.const';
import { MatSnackBar } from '@angular/material';
import { ApiAuthService } from 'app/services/auth.service';


@Injectable()
export class TrainingvideoService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(
    private _httpClient: HttpClient,
    private _token: ApiTokenService,
    private _auth: ApiAuthService,
  ) { }

  private jwt(): any {
    const tokenStr = this._token.get();
    if (tokenStr) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + tokenStr);
        return headers;
    } else {
        return '';
    }
}

  getList(){
    return new Promise((resolve, reject) => {
      let headers={ headers: this.jwt()};
      this._httpClient.post(Constants.API_URL + '/api/trainingVideos', {},headers)
          .subscribe((response: any) => {
              resolve(response['data']);
          },
          error => {
              if (error.status == 301) {
                  this._auth.logout();
              }
          });
  }
);
  }
}
