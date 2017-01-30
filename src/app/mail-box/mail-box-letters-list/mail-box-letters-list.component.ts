import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MailBoxLettersListService } from './mail-box-letters-list.service'

import { Letter } from './../../domain/letter'

@Component({
  selector: 'app-mail-box-letters-list',
  templateUrl: './mail-box-letters-list.component.html',
  styleUrls: ['./mail-box-letters-list.component.css'],
  providers: [MailBoxLettersListService]
})
export class MailBoxLettersListComponent implements OnInit {

  letters: Letter[];

  constructor(private route: ActivatedRoute, private letterService: MailBoxLettersListService) { }

  ngOnInit() {
    this.letters = [];
    this.route.params.subscribe((params:any)=> {
      if(params.mailBoxId != undefined)
      {
        this.letterService.get(params.mailBoxId)
          .subscribe(item => this.letters.push(item));
      }
    });
  }

}
