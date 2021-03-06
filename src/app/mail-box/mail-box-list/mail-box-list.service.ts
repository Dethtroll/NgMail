import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'

import { MailBox } from './../../domain/mailBox'

@Injectable()
export class MailBoxListService {

  constructor(private http: Http) { }

  get():Observable<MailBox>
  {
    return this.http.get('https://test-api.javascript.ru/v1/dethtroll/mailboxes')
      .map(response => response.json())
      .mergeMap((mailBoxes: MailBox[]) => Observable.from(mailBoxes))
      .catch((error: any, t:Observable<any>) => {
        console.error(error);
        return Observable.throw(error);
      });
  }
}
