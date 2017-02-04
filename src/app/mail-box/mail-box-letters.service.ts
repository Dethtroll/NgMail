import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

import { Letter } from './../domain/letter'

@Injectable()
export class MailBoxLettersService {

  constructor(private http: Http) { }

  getAll(mailBoxName: string): Observable<Letter> {
    return this.http.get('http://test-api.javascript.ru/v1/dethtroll/letters')
      .map(response => response.json())
      .mergeMap((letters: Letter[]) => Observable.from(
        letters.map((l: Letter) => { 
          let letter = new Letter(l.subject, l.body, l.to, l.mailbox, l._id);
          return letter;
        })))
      .filter(letter => letter.mailbox == mailBoxName)
      .catch((error: any, t:Observable<any>) => {
        console.error(error);
        return Observable.throw(error);
      });
  }

  get(letterId: string): Observable<Letter> {
    return this.http.get('http://test-api.javascript.ru/v1/dethtroll/letters/'+letterId)
      .map(response => response.json())
      .mergeMap((l: Letter) => {
        let letter = new Letter(l.subject, l.body, l.to, l.mailbox, l._id);
        return Observable.from([letter]);
      })
      .catch((error: any, t:Observable<any>) => {
        console.error(error);
        return Observable.throw(error);
      });
  }

  send(letter: Letter): void {
    letter.mailbox = '58920c629de15a250410f6b9';
    this.http.post('http://test-api.javascript.ru/v1/dethtroll/letters/', letter)
      .catch((error: any, t:Observable<any>) => {
          console.error(error);
          return Observable.throw(error);})
      .subscribe(x => console.log(x))
      ;
  }
}
