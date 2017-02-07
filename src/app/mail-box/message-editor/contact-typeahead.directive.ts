import { Component, ElementRef, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/map";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

import { Contact } from './../../domain/contact';

import { ContactsBookService } from './../../contacts-book.service';

@Component({
  selector: '[contactTypeahead]',

 template: `
  <ng-content></ng-content>
  <div class="typeahead" #contentWrapper>
    <ul *ngIf="typeaheadVisible">
      <li *ngFor="let item of items" (click)="selectItem(item)">{{item}}</li>
    </ul>    
  </div>`
})
export class ContactTypeaheadDirective {
  
  private typeaheadVisible: boolean = false;
  private items: string[];
  private searchData = new Subject<string>();

  @ViewChild('contentWrapper')
  content: ElementRef;

  @Output() 
  ngModelChange: EventEmitter<any> = new EventEmitter(false);

  constructor(private viewContainerRef: ElementRef, private contactsService: ContactsBookService) {    
    this.searchData
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        (filter: string) => {
           filter = (filter || '').trim();
           if(filter.length > 2) {
              this.contactsService.find(filter, 5)
                .subscribe(items => {                  
                  this.items = items;
                  this.typeaheadVisible = items.length > 0;
                });
           }
           else {
             this.items = [];
             this.typeaheadVisible = false;
           }
      });
  }

  @HostListener('input', ['$event']) oninput(event: any) {
    this.searchData.next(event.target.value);
  }

  private selectItem(value:string) {
    this.viewContainerRef.nativeElement.value = value;
    this.ngModelChange.emit(value);
    this.searchData.next(undefined);
  }

  public ngAfterViewInit() {
     let input = this.viewContainerRef.nativeElement;
     input.parentElement.insertBefore(this.content.nativeElement, input.nextSibling);
  }
}
