import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Letter } from './../../../domain/letter';

import { MailBoxLettersService } from './../../mail-box-letters.service';
import { ContactsBookService } from './../../../contacts-book.service';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.css']
})
export class ReplyFormComponent implements OnInit {

  @Input()
  sourceLetter: Letter;

  constructor(
    private letterService: MailBoxLettersService, 
    private contactService: ContactsBookService,
    private router:Router) { }

  ngOnInit() {
  }

  sendReplyRequested(replyBody: string) {
    let letterId = null;
    let mailboxId = null;
    this.letterService.send(new Letter(this.sourceLetter.subject, replyBody, this.sourceLetter.from))
      .subscribe(
        sendedLetter => { 
          letterId = sendedLetter._id;
          mailboxId = sendedLetter.mailbox;
          this.contactService.addIfNotExist(sendedLetter.to);},
        undefined,
        () => {
          this.router.navigate(["/mailbox", mailboxId, 'view', letterId]);
        });
  }
}
