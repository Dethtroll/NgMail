import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Letter } from './../../domain/letter';
import { MailBoxLettersService } from './../mail-box-letters.service'

@Component({
  selector: 'app-message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageViewerComponent implements OnInit {
  
  letter: Letter;

  constructor(private route: ActivatedRoute, private letterService: MailBoxLettersService) { }

  ngOnInit() {
    this.route.params.subscribe((params:any)=> {
      if(params.letterId != undefined)
      {
         this.letterService.get(params.letterId)
          .subscribe((letter:Letter) => { 
            this.letter = letter;
           });
      }
    });
  }

}
