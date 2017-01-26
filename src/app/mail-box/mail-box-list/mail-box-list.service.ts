import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class MailBoxListService {

  constructor(private http: Http) { }

  get()
  {
    let a = this.http.get('http://test-api.javascript.ru/v1/dethtroll/mailboxes')
      .map(response => response.json())
      .catch((error: any, t:Observable<any>) => {
        console.error(error);
        return Observable.throw(error);
      });

    return a;
  }

}
