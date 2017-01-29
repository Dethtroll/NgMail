import { Component, OnInit } from '@angular/core';
import { MailBoxListService } from './mail-box-list.service';

import { MailBox } from './../../domain/mailBox'

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-mail-box-list',
  templateUrl: './mail-box-list.component.html',
  styleUrls: ['./mail-box-list.component.css'],
  providers: [MailBoxListService]
})
export class MailBoxListComponent implements OnInit {
  mailBoxes: MailBox[];

  constructor(private listService: MailBoxListService) { }

  ngOnInit() {
    this.mailBoxes = [];
    this.listService.get()
      .subscribe(item => this.mailBoxes.push(item));
  }

}
