import { Component, OnInit, Input } from '@angular/core';

import { Letter } from './../../../domain/letter'

import { MailBoxLettersListService } from './../../mail-box-letters-list.service';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.css']
})
export class ReplyFormComponent implements OnInit {

  @Input()
  sourceLetter: Letter;

  constructor(private letterService: MailBoxLettersListService) { }

  ngOnInit() {
  }

  sendReplyRequested(replyBody: string) {
    this.letterService.post({mailbox: '58920c629de15a250410f6b9', subject: this.sourceLetter.subject, body: replyBody, to:this.sourceLetter.from});
  }

}
