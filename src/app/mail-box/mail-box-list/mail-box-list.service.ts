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
  // this.http.post("http://test-api.javascript.ru/v1/dethtroll", {letters:[{"mailbox": "588ce68c9de15a250410f4a4", "subject":"Test message", "body":"Testing", "to":"asdf@asdf.ru"}]})
  //   .catch((error: any, t:Observable<any>) => {
  //       console.error(error);
  //       return Observable.throw(error);})
  //   .subscribe(x => console.log(x));

  // this.http.post("http://test-api.javascript.ru/v1/dethtroll", {mailboxes:[{"title": "Inbox"}]})
  //   .catch((error: any, t:Observable<any>) => {
  //       console.error(error);
  //       return Observable.throw(error);})
  //   .subscribe(x => console.log(x));

    // this.http.delete("http://test-api.javascript.ru/v1/dethtroll/mailboxes")
    //   .subscribe(x => console.log(x));

    return this.http.get('http://test-api.javascript.ru/v1/dethtroll/mailboxes')
      .map(response => response.json())
      .mergeMap((mailBoxes: MailBox[]) => Observable.from(mailBoxes))
      .catch((error: any, t:Observable<any>) => {
        console.error(error);
        return Observable.throw(error);
      });
  }

}
