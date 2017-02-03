import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Letter } from './../../domain/letter';
import { MailBoxLettersListService } from './../mail-box-letters-list.service'

@Component({
  selector: 'app-message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageViewerComponent implements OnInit {
  
  letter: Letter;

  constructor(private route: ActivatedRoute, private letterService: MailBoxLettersListService) { }

  ngOnInit() {
    this.route.params.subscribe((params:any)=> {
      if(params.letterId != undefined)
      {
         this.letterService.get(params.letterId)
          .subscribe(letter => { 
            this.letter = letter;
            this.letter.from = this.letter.to;
           });
      }
    });
  }

}
