import { Component, OnInit } from '@angular/core';
import { MailBoxListService } from './mail-box-list.service'

@Component({
  selector: 'app-mail-box-list',
  templateUrl: './mail-box-list.component.html',
  styleUrls: ['./mail-box-list.component.css'],
  providers: [MailBoxListService]
})
export class MailBoxListComponent implements OnInit {
  mailBoxes: string[];

  constructor(private listService: MailBoxListService) { }

  ngOnInit() {
    this.listService.get()
      .subscribe(items => this.mailBoxes = items as string[]);
  }

}
