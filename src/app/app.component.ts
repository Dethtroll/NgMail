import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'

import { AppMode } from './domain/appMode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app works!';

  modes = [
    {id: AppMode.Mail, title: "Gmail"},
    {id: AppMode.Contacts, title: "Contacts"},
  ];
  selectedMode: any;
  
  constructor(private router:Router) {

  }

  ngOnInit() {
    this.selectedMode = this.modes[0];
  }

  modeChanged(mode:AppMode) {
    if(mode == AppMode.Contacts) {
      this.router.navigate(['addresses']);
    }
    //if(mode == AppMode.Mail) {
    else {
      this.router.navigate(['mailbox', 'inbox']);
    }
  }
}
