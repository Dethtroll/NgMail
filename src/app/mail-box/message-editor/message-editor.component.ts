import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgModel, NgForm, NgModelGroup } from '@angular/forms';

import { Letter } from './../../domain/letter'

import { MailBoxLettersService } from './../mail-box-letters.service';

@Component({
  selector: 'app-message-editor',
  templateUrl: './message-editor.component.html',
  styleUrls: ['./message-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageEditorComponent implements OnInit {

  @ViewChild('f')
  myform: NgForm;

  letter = {to: '', subject: '', body: ''};

  constructor(private letterService: MailBoxLettersService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    if(form.valid) {
      let letter = form.value.letter;
      this.letterService.send(new Letter(letter.subject, letter.body, letter.to))
    }
  }
}
