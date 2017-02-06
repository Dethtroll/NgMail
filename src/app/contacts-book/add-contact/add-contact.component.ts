import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Contact } from './../../domain/contact'

import { ContactsBookService } from './../../contacts-book.service'

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  
  public addContactForm: FormGroup;

  constructor(private contactService: ContactsBookService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let emailRegxp = '[a-zA-Z0-9_]+@[a-zA-Z0-9_.]+';
    this.addContactForm = this.formBuilder.group({
      main: this.formBuilder.group({
        fullname: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.pattern(emailRegxp)]],
      }),
    });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if(!valid) return;

    let contact = new Contact(value.main.fullname, value.main.email);

    this.contactService.add(contact)
      .subscribe(contact => this.contactAdded.emit(contact))

    this.addContactForm.reset();
  }

  @Output()
  contactAdded = new EventEmitter<Contact>();
}
