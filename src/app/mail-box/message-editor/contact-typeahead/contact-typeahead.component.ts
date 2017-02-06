import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import { Contact } from './../../../domain/contact';

import { ContactsBookService } from './../../../contacts-book.service';

@Component({
  selector: 'app-contact-typeahead',
  templateUrl: './contact-typeahead.component.html',
  styleUrls: ['./contact-typeahead.component.css']
})
export class ContactTypeaheadComponent implements OnInit {
  
  items: Array<Contact>;
  filter: string;

  constructor(private contactsService: ContactsBookService) { }

  ngOnInit() {
  }

  inputHandler():void {
    this.items = [];
    this.contactsService.getAll()
    .filter(contact => contact.email.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1)
    .subscribe(contact => this.items.push(contact)); 
  }
  itemClickHandler(email: string)
  {
    this.filter = email;
    this.items = [];
  }

}
