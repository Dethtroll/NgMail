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
    this.letterService.send(new Letter(this.sourceLetter.subject, replyBody, this.sourceLetter.from));
  }

}
