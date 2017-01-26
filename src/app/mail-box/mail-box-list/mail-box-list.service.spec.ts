/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MailBoxListService } from './mail-box-list.service';

describe('MailBoxListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailBoxListService]
    });
  });

  it('should ...', inject([MailBoxListService], (service: MailBoxListService) => {
    expect(service).toBeTruthy();
  }));
});
