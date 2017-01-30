import { Component, OnInit } from '@angular/core';

import { Letter } from './../../domain/letter'

@Component({
  selector: 'app-mail-box-letters-list',
  templateUrl: './mail-box-letters-list.component.html',
  styleUrls: ['./mail-box-letters-list.component.css']
})
export class MailBoxLettersListComponent implements OnInit {

  letters: Letter[];

  constructor() { }

  ngOnInit() {
  }

}
