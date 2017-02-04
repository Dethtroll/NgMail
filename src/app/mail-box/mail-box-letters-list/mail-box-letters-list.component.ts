import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MailBoxLettersService } from './../mail-box-letters.service'

import { Letter } from './../../domain/letter'

@Component({
  selector: 'app-mail-box-letters-list',
  templateUrl: './mail-box-letters-list.component.html',
  styleUrls: ['./mail-box-letters-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MailBoxLettersListComponent implements OnInit {

  letters: Letter[];

  constructor(private route: ActivatedRoute, private router:Router, private letterService: MailBoxLettersService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:any)=> {
      this.letters = [];
      if(params.mailBoxId != undefined)
      {
        this.letterService.getAll(params.mailBoxId)
          .subscribe(item => { this.letters.push(item); });
      }
    });
  }

  viewMessageRequested(letter: Letter): void {
    this.router.navigate(["/mailbox", letter.mailbox, "view", letter._id]);
  }
}
