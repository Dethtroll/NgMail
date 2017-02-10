/* tslint:disable:no-unused-variable */
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { Letter } from './../../../domain/letter';

import { ReplyFormComponent } from './reply-form.component';
import { MailBoxLettersService } from './../../mail-box-letters.service';
import { ContactsBookService } from './../../../contacts-book.service';

let mockLetter: Letter;
let mailBoxService: MailBoxLetterServiceFixture;
let mailBoxServiceSpy: jasmine.Spy;

let contactsService: ContactsBookService;
let contactsServiceSpy: jasmine.Spy;

let routerService: Router;
let routerServiceSpy: jasmine.Spy;

class MailBoxLetterServiceFixture{
  send(letter: Letter): Observable<Letter> {
    return Observable.from([letter]);
  }
}

describe('ReplyFormComponent', () => {
  let component: ReplyFormComponent;
  let fixture: ComponentFixture<ReplyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule.withRoutes([{path:'mailbox/11/view/1', redirectTo: 'list'}])],
      providers: [
        MailBoxLetterServiceFixture, 
        {provide: MailBoxLettersService, useClass: MailBoxLetterServiceFixture}, 
        ContactsBookService
      ],
      declarations: [ ReplyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyFormComponent);
    component = fixture.componentInstance;

    mockLetter = new Letter('Testing', 'This is body', 'test@mail.ru', '11', '1');
    mailBoxService = fixture.debugElement.injector.get(MailBoxLettersService);
    mailBoxServiceSpy = spyOn(mailBoxService, 'send').and.returnValue(Observable.from([mockLetter]));

    contactsService = fixture.debugElement.injector.get(ContactsBookService);
    contactsServiceSpy = spyOn(contactsService, 'addIfNotExist').and.returnValue(null);

    routerService = fixture.debugElement.injector.get(Router);
    routerServiceSpy = spyOn(routerService, 'navigate').and.returnValue(null);

    fixture.detectChanges();
  });

  it('should create', inject([MailBoxLettersService, ContactsBookService, Router], (mailSrv: MailBoxLettersService, contactSrv: ContactsBookService, router: Router) => {
    expect(component).toBeTruthy();
  }));

  it('should exec service on send letter', inject([MailBoxLettersService, ContactsBookService, Router], (mailSrv: MailBoxLettersService, contactSrv: ContactsBookService, router: Router) => {
    let replyBody = "Reply body text";
    component.sourceLetter = mockLetter;
    
    component.sendReplyRequested(replyBody);

    expect(mailBoxServiceSpy.calls.any()).toBeTruthy();
  }));

  it('should add contact on send letter', inject([MailBoxLettersService, ContactsBookService, Router], (mailSrv: MailBoxLettersService, contactSrv: ContactsBookService, router: Router) => {
    let replyBody = "Reply body text";
    component.sourceLetter = mockLetter;
    
    component.sendReplyRequested(replyBody);

    expect(contactsServiceSpy.calls.any()).toBeTruthy();
  }));

  it('should redirect to mailbox on send letter', inject([MailBoxLettersService, ContactsBookService, Router], (mailSrv: MailBoxLettersService, contactSrv: ContactsBookService, router: Router) => {
    let replyBody = "Reply body text";
    component.sourceLetter = mockLetter;
    
    component.sendReplyRequested(replyBody);

    expect(routerServiceSpy.calls.argsFor(1)).toBeTruthy();
  }));

});
