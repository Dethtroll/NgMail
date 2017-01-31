/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MailBoxLettersListService } from './mail-box-letters-list.service';

describe('MailBoxLettersListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailBoxLettersListService]
    });
  });

  it('should ...', inject([MailBoxLettersListService], (service: MailBoxLettersListService) => {
    expect(service).toBeTruthy();
  }));
});
