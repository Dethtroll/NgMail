import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AppMode } from './domain/appMode';

import { ContactsBookService } from './contacts-book.service';
import { ControlPanelService } from './control-panel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ContactsBookService, ControlPanelService]
})
export class AppComponent implements OnInit {

  modes = [
    {id: AppMode.Mail, title: "Gmail"},
    {id: AppMode.Contacts, title: "Contacts"},
  ];
  selectedMode: any;

  navigateBackAvailable: boolean = false;
  selectManyAvailable: boolean = true;
  deleteAvailable: boolean = false;
  moreActionsAvailable: boolean = false;
  
  constructor(private router:Router, private controlPanel: ControlPanelService) {
  }

  ngOnInit() {
    this.controlPanel.selectedCountChanged.subscribe(count => this.deleteAvailable = count > 0 );

    this.selectedMode = this.modes[0];
    this.controlPanel.selectedCountChange(0);
  }

  modeChanged(mode:AppMode) {
    this.controlPanel.appModeChange(mode);
    
    if(mode == AppMode.Contacts) {
      this.controlPanel.appModeChange(mode);
      this.router.navigate(['contacts']);
    }
    //if(mode == AppMode.Mail) {
    else {
      this.router.navigate(['mailbox', 'inbox']);
    }
  }

  selectionChanged(mode: boolean) {
    if(mode) {
      this.controlPanel.selectAllRaise();
    }
    else {
      this.controlPanel.selectNoneRaise();
    }
  }

  searchValueEntered(value: string) {
    this.controlPanel.searchValueChange(value);
  }
}
