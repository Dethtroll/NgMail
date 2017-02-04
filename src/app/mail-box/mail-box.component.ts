import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MailBoxLettersListService } from './mail-box-letters-list.service'

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css'],
  providers: [MailBoxLettersListService],
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
