import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

import { Letter } from './../../domain/letter'

@Injectable()
export class MailBoxLettersListService {

  constructor(private http: Http) { }

  get(mailBoxName: string):Observable<Letter>
  {
    return this.http.get('http://test-api.javascript.ru/v1/dethtroll/letters')
      .map(response => response.json())
      .mergeMap((letters: Letter[]) => Observable.from(letters))
      .filter(object => object.mailbox == mailBoxName)
      .catch((error: any, t:Observable<any>) => {
        console.error(error);
        return Observable.throw(error);
      });
  }

}
