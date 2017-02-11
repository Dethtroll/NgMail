import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppMode } from './domain/appMode';

import { AuthStorageService } from './auth-storage.service';
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
  isLoggedIn: boolean;

  navigateBackAvailable: boolean = false;
  selectManyAvailable: boolean = true;
  deleteAvailable: boolean = false;
  moreActionsAvailable: boolean = false;
  
  constructor(
    private router:Router,
    private route: ActivatedRoute, 
    private controlPanel: ControlPanelService,
    private authService: AuthStorageService) {
  }

  ngOnInit() {
    this.controlPanel.selectedCountChanged.subscribe(count => this.deleteAvailable = count > 0 );

    this.isLoggedIn = this.authService.isLoggedIn;
    this.authService.LoggedInSubject.subscribe(authStatus => this.isLoggedIn = authStatus);

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
      this.router.navigate(['mailbox', '58920c6c9de15a250410f6ba']);
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
