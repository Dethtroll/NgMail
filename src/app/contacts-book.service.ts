import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

import { Contact } from './domain/contact'

@Injectable()
export class ContactsBookService {

  constructor(private http: Http) { }

  getAll(): Observable<Contact> {
    return this.http.get('http://test-api.javascript.ru/v1/dethtroll/users')
      .map(response => response.json())
      .mergeMap((contacts: Contact[]) => Observable.from(contacts))
      .catch((error: any, t:Observable<any>) => {
        console.error(error);
        return Observable.throw(error);
      });
  }

  get(contactId: string): Observable<Contact> {
    return this.http.get('http://test-api.javascript.ru/v1/dethtroll/users/'+contactId)
      .map(response => response.json())
      .mergeMap((contact: Contact) => Observable.from([contact]))
      .catch((error: any, t:Observable<any>) => {
        console.error(error);
        return Observable.throw(error);
      });
  }

  add(contact: Contact): Observable<Contact> {
    return this.http.post('http://test-api.javascript.ru/v1/dethtroll/users/', contact)
      .map(response => response.json())
      .mergeMap((contact: Contact) => Observable.from([contact]))
      .catch((error: any, t:Observable<any>) => {
        console.error(error);
        return Observable.throw(error);
      });
  }

  update(contact: Contact) {
    return this.http.put('http://test-api.javascript.ru/v1/dethtroll/users/', contact)
      .map(response => response.json())
      .mergeMap((contact: Contact) => Observable.from([contact]))
      .catch((error: any, t:Observable<any>) => {
        console.error(error);
        return Observable.throw(error);
      });
  }

  detete(contact: Contact) {

  }
}
