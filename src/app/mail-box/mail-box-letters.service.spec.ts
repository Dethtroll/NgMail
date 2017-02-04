/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MailBoxLettersService } from './mail-box-letters.service';

describe('MailBoxLettersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailBoxLettersService]
    });
  });

  it('should ...', inject([MailBoxLettersService], (service: MailBoxLettersService) => {
    expect(service).toBeTruthy();
  }));
});
