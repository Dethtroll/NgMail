import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Contact } from './../../domain/contact'
import { ContactDto } from './contactDto'

import { ContactsBookService } from './../../contacts-book.service'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: ContactDto[];

  constructor(private contacsService: ContactsBookService) { }

  ngOnInit() {
    this.contacts = [];

    this.contacsService.getAll()
      .subscribe(item => { let dto = new ContactDto(item.fullName, item.email, item._id); this.addContact(dto); });
  }

  ngOnDestroy(){

  }

  private addContact(contact: ContactDto){
    this.contacts.push(contact);
  }

  updateRequested(form: NgForm) {
    let contact = form.value;

    this.contacsService.update(new Contact(contact.newFullName, contact.newEmail, contact._id))
      .subscribe((item: Contact) => { 
        
        let dto = this.contacts.find((currentDto: ContactDto) => currentDto._id == item._id);
        dto.fullName = dto.newFullName = item.fullName;
        dto.email = dto.newEmail = item.email;
        dto.isEdditing = false;
      })
  }

  deleteRequested(contact: ContactDto) {
    this.contacsService.detete(contact)
      .subscribe((responce: boolean) => {
        if(responce) {
          let index = this.contacts.findIndex((currentDto: ContactDto) => currentDto._id == contact._id);
          if(index >=0 ) {
            this.contacts.splice(index, 1);
          }
        }
      })
  }

  //   viewMessageRequested(letter: Letter): void {
  //   this.router.navigate(["/mailbox", letter.mailbox, "view", letter._id]);
  // }
}
