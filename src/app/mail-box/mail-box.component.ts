import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MailBoxLettersService } from './mail-box-letters.service'

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  providers: [MailBoxLettersService],
  encapsulation: ViewEncapsulation.None
})
export class MailBoxComponent implements OnInit {

  mailboxId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params:any)=> {
      if(params.mailBoxId != undefined)
      {
        this.mailboxId = params.mailBoxId
      }
    });
  }

}
