/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactsBookService } from './contacts-book.service';

describe('ContactsBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactsBookService]
    });
  });

  it('should ...', inject([ContactsBookService], (service: ContactsBookService) => {
    expect(service).toBeTruthy();
  }));
});
