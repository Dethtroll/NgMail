import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MailBoxLettersListService } from './../mail-box-letters-list.service'

@Component({
  selector: 'app-message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageViewerComponent implements OnInit {
  
  messageSubject: string;
  messageSender: string;
  messageBody: string;

  constructor(private route: ActivatedRoute, private letterService: MailBoxLettersListService) { }

  ngOnInit() {
    this.route.params.subscribe((params:any)=> {
      if(params.letterId != undefined)
      {
         this.letterService.get(params.letterId)
          .subscribe(letter => { 
            this.messageSubject = letter.subject;
            this.messageSender = letter.to;
            this.messageBody = letter.body;
           });
      }
    });
  }

}
