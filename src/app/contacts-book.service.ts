import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

import { Contact } from './domain/contact';

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

  addIfNotExist(email: string) {
    let name = email.slice(0, email.indexOf('@'));
    let existContact: Contact = null;
    this.getAll()
      .filter(contact => contact.email === email)
      .subscribe(
        contact => existContact = contact,  
        undefined,
        () => { if(existContact === null) { this.add(new Contact(name, email)).subscribe(x => x); }});
  }

  update(contact: Contact): Observable<Contact> {
    return this.http.patch('http://test-api.javascript.ru/v1/dethtroll/users/'+contact._id, contact)
      .map(response => response.json())
      .mergeMap((contact: Contact) => Observable.from([contact]))
      .catch((error: any, t:Observable<any>) => {
        console.error(error);
        return Observable.throw(error);
      });
  }

  delete(contacts: Contact[]): Observable<string> {
    return Observable.from(contacts)
      .map(contact => this.http.delete('http://test-api.javascript.ru/v1/dethtroll/users/'+contact._id))
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
