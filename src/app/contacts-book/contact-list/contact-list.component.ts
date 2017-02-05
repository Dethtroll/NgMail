import { Component, OnInit } from '@angular/core';

import { Contact } from './../../domain/contact'

import { ContactsBookService } from './../../contacts-book.service'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];

  constructor(private contacsService: ContactsBookService) { }

  ngOnInit() {
    this.contacts = [];

    this.contacsService.getAll()
      .subscribe(item => { this.addContact(item); });
  }

  addContact(contact: Contact){
    this.contacts.push(contact);
  }

  updateRequested(contact: Contact) {
    // this.contacsService.update(contact)
    //   .subscribe(item => )
  }

  //   viewMessageRequested(letter: Letter): void {
  //   this.router.navigate(["/mailbox", letter.mailbox, "view", letter._id]);
  // }
}
