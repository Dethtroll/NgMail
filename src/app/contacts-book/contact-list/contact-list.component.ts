import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { Contact } from './../../domain/contact';
import { ContactDto } from './contactDto';

import { ContactsBookService } from './../../contacts-book.service';
import { ControlPanelService } from './../../control-panel.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: ContactDto[];
  selectedCount: number;


  _deleteSelectedObservable: Subscription;

  constructor(private contacsService: ContactsBookService, private controlPanel: ControlPanelService) { }

  ngOnInit() {
    this.contacts = [];
    this.selectedCount = 0;

    this.contacsService.getAll()
      .subscribe(item => { let dto = new ContactDto(item.fullName, item.email, item._id); this.addContact(dto); });

    this._deleteSelectedObservable = this.controlPanel.deleteRequested.subscribe(this.deleteSelectedRequested);
    this.controlPanel.selectedAll.subscribe(() => this.selectAllRequested());
    this.controlPanel.selectedNone.subscribe(() => this.selectNoneRequested());
  }

  ngOnDestroy(){
    this._deleteSelectedObservable.unsubscribe();
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

  selectChanged(event: boolean) {
    this.selectedCount = this.selectedCount + (event ? 1 : -1);
    this.controlPanel.selectedCountChange(this.selectedCount);
  }

  deleteSelectedRequested() {
    console.log("D")
  }

  selectAllRequested(){
    this.contacts.forEach(value => value.isChecked = true);
  }

  selectNoneRequested(){
    this.contacts.forEach(value => value.isChecked = false);
  }

  //   viewMessageRequested(letter: Letter): void {
  //   this.router.navigate(["/mailbox", letter.mailbox, "view", letter._id]);
  // }
}
