import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { Letter } from './../domain/letter';

@Injectable()
export class MailBoxLettersService {

  constructor(private http: Http) { }

  getAll(mailBoxId: string): Observable<Letter> {
    return this.http.get('http://test-api.javascript.ru/v1/dethtroll/letters/')
      .map(response => response.json())
      .mergeMap((letters: Letter[]) => Observable.from(
        letters.map((l: Letter) => { 
          let letter = new Letter(l.subject, l.body, l.to, l.mailbox, l._id);
          return letter;
        })))
      .filter(letter => letter.mailbox == mailBoxId)
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

  send(letter: Letter): Observable<Letter> {
    letter.mailbox = '58920c629de15a250410f6b9';
    return this.http.post('http://test-api.javascript.ru/v1/dethtroll/letters/', letter)
      .map(response => response.json())
      .catch((error: any, t:Observable<any>) => {
          console.error(error);
          return Observable.throw(error);
      });
  }

  delete(letters: Letter[]): Observable<string> {
    return Observable.from(letters)
      .map(letter => this.http.delete('http://test-api.javascript.ru/v1/dethtroll/letters/'+letter._id))
      .mergeMap(response => response)
      .filter(response => response.ok)
      .map(response => { 
        return response.url.slice(response.url.lastIndexOf('/')+1)
      })
      .catch((error: any, t:Observable<any>) => {
        console.error(error);
        return Observable.throw(error);
      });
    
  }
}
