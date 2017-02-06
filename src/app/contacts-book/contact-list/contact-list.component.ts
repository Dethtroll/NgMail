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

  filterValue: string = null;
  contacts: ContactDto[];
  _selectedCount: number;

  get selectedCount(): number {
    return this._selectedCount;
  }
  set selectedCount(value: number) {
    this._selectedCount = value;
    this.controlPanel.selectedCountChange(this._selectedCount);
  }

  _deleteSelectedObservable: Subscription;
  _selectedAllObservable: Subscription;
  _selectedNoneObservable: Subscription;
  _searchObservable: Subscription;

  constructor(private contacsService: ContactsBookService, private controlPanel: ControlPanelService) { }

  ngOnInit() {
    this.contacts = [];
    this.selectedCount = 0;

    this.contacsService.getAll()
      .subscribe(item => { let dto = new ContactDto(item.fullName, item.email, item._id); this.addContact(dto); });

    this._deleteSelectedObservable = this.controlPanel.deleteRequested.subscribe(() => this.deleteSelectedRequested());
    this._selectedAllObservable = this.controlPanel.selectedAll.subscribe(() => this.selectAllRequested());
    this._selectedNoneObservable = this.controlPanel.selectedNone.subscribe(() => this.selectNoneRequested());
    this._searchObservable = this.controlPanel.searchValueChanged.subscribe((value: string) => this.filterValue = value);
  }

  ngOnDestroy(){
    this._deleteSelectedObservable.unsubscribe();
    this._selectedAllObservable.unsubscribe();
    this._selectedNoneObservable.unsubscribe();
    this._searchObservable.unsubscribe();
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

  selectChanged(event: boolean) {
    this.selectedCount = this.selectedCount + (event ? 1 : -1);
  }

  deleteRequested(contact: ContactDto) {
    this.deleteContacts([contact]);
  }

  deleteSelectedRequested() {
    let needDelete = this.contacts.filter(contact => contact.isChecked);
    this.deleteContacts(needDelete);
  }

  deleteContacts(needDelete: Contact[]) {
    this.contacsService.delete(needDelete)
      .subscribe((responce: string) => {
        let index = this.contacts.findIndex((currentDto: ContactDto) => currentDto._id == responce);
        if(index >=0 ) {
          if(this.contacts[index].isChecked) {
            this.selectedCount--;
          }

          this.contacts.splice(index, 1);
        }
      });
  }

  selectAllRequested(){
    this.contacts.forEach(value => value.isChecked = true);
    this.selectedCount = this.contacts.length;
  }

  selectNoneRequested(){
    this.contacts.forEach(value => value.isChecked = false);
    this.selectedCount = 0;
  }

  //   viewMessageRequested(letter: Letter): void {
  //   this.router.navigate(["/mailbox", letter.mailbox, "view", letter._id]);
  // }
}
