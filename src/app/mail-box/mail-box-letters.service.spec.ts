/* tslint:disable:no-unused-variable */

import { HttpModule, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';

import { Letter } from './../domain/letter';

import { MailBoxLettersService } from './mail-box-letters.service';

let lettersApiUrl: string = 'https://test-api.javascript.ru/v1/dethtroll/letters/';
let inboxId: string = '58920c6c9de15a250410f6ba';
let sentId: string = '58920c629de15a250410f6b9';
let inboxLetter = new Letter('Test sbj', 'Test body', 'karba@local', inboxId, '5');
let otherLetter = new Letter('Other test sbj', 'other test body', 'karba@local', '67', '7');
let allMessages: Letter[] = [ inboxLetter, otherLetter ];

describe('MailBoxLettersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        MailBoxLettersService]
    });
  });

  it('should ...', inject([MailBoxLettersService], (service: MailBoxLettersService) => {
    expect(service).toBeTruthy();
  }));

  it('shoud get all letters only for inbox', inject([XHRBackend, MailBoxLettersService], (mockBackend: MockBackend, service: MailBoxLettersService) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      let responseOptions = new ResponseOptions({body: JSON.stringify(allMessages)});
      connection.mockRespond(new Response(responseOptions));
      expect(connection.request.url).toBe(lettersApiUrl);
      expect(connection.request.method).toBe(RequestMethod.Get);
    });

    service.getAll(inboxId).subscribe((letter) => {
      expect(letter).toEqual(inboxLetter);
    });
  }));

  it('shoud get letter by letterId', inject([XHRBackend, MailBoxLettersService], (mockBackend: MockBackend, service: MailBoxLettersService) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      let responseOptions = new ResponseOptions({body: JSON.stringify(inboxLetter)});
      connection.mockRespond(new Response(responseOptions));
      expect(connection.request.url).toBe(lettersApiUrl + inboxLetter._id);
      expect(connection.request.method).toBe(RequestMethod.Get);
    });

    service.get(inboxLetter._id).subscribe((letter) => {
      expect(letter).toEqual(inboxLetter);
    });
  }));

  it('shoud return letter with mailboxId when letter was sended', inject([XHRBackend, MailBoxLettersService], (mockBackend: MockBackend, service: MailBoxLettersService) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      let responseOptions = new ResponseOptions({body: JSON.stringify(otherLetter)});
      connection.mockRespond(new Response(responseOptions));
      expect(connection.request.url).toBe(lettersApiUrl);
      expect(connection.request.method).toBe(RequestMethod.Post);
    });

    service.send(otherLetter).subscribe((letter) => {
      expect(letter.mailbox).toEqual(sentId);
    });
  }));

  it('shoud return letter id when letter was deleted', inject([XHRBackend, MailBoxLettersService], (mockBackend: MockBackend, service: MailBoxLettersService) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      let responseOptions = new ResponseOptions({body: JSON.stringify(otherLetter)});
      connection.mockRespond(new Response(responseOptions));
      expect(connection.request.url).toBe(lettersApiUrl + otherLetter._id);
      expect(connection.request.method).toBe(RequestMethod.Delete);
    });

    service.delete([otherLetter]).subscribe((id) => {
      expect(id).toEqual(otherLetter._id);
    });
  }));

});