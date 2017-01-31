import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MailBoxLettersListService } from './mail-box-letters-list.service'

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css'],
  providers: [MailBoxLettersListService]
})
export class MailBoxComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params:any)=> {
      if(params.mailBoxId != undefined)
      {
        
      }
    });
  }

}
