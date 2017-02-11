import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgModel, NgForm, NgModelGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Letter } from './../../domain/letter'

import { MailBoxLettersService } from './../mail-box-letters.service';
import { ContactsBookService } from './../../contacts-book.service';

@Component({
  selector: 'app-message-editor',
  templateUrl: './message-editor.component.html',
  styleUrls: ['./message-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageEditorComponent implements OnInit {

  @ViewChild('f')
  myform: NgForm;

  letter = { to: '', subject: '', body: '' };

  constructor(
    private letterService: MailBoxLettersService, 
    private contactService: ContactsBookService,
    private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    if(form.valid) {
      let letter = form.value.letter;
      let letterId = null;
      let mailboxId = null;
      this.letterService.send(new Letter(letter.subject, letter.body, letter.to))
        .subscribe(
          sendedLetter => {
            letterId = sendedLetter._id; 
            mailboxId = sendedLetter.mailbox;
            this.contactService.addIfNotExist(sendedLetter.to);},
          undefined,
          () => this.router.navigate(["/mailbox", mailboxId, 'view', letterId]));
    }
  }
}
