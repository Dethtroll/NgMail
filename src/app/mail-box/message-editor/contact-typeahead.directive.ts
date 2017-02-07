import { Component, ElementRef, ViewContainerRef, ViewChild, HostListener } from '@angular/core';

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

/*
<div class="typeahead-container">

  <div class="typeahead-header">
    <input (input)="inputHandler()" [(ngModel)]="filter" />
  </div>
  <div class="typeahead-items">
    <div *ngFor="let item of items" (click)="itemClickHandler(item.email)" class="typeahead-item">
      {{item.fullName}} - {{item.email}}
    </div>
  </div>

</div>
 */

@Component({
  selector: '[contactTypeahead]',

 template: `
  <ng-content></ng-content>
  <div #contentWrapper>
    <ul *ngIf="typeaheadVisible">
      <li *ngFor="let item of items | async" (click)="selectItem(item)">{{item}}</li>
    </ul>    
  </div>
  `
})
export class ContactTypeaheadDirective {
  
  private typeaheadVisible: boolean = false;
  private items: Observable<string[]>;
  private searchData = new Subject<string>();

  @ViewChild('contentWrapper')
  content: ElementRef;

  constructor(private viewContainerRef: ViewContainerRef, private contactsService: ContactsBookService) {
    //, private contactsService: ContactsBookService
    // this.contactsService.getAll()
    // .filter(contact => contact.email.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1)
    // .subscribe(contact => this.items.push(contact)); 
    
    this.items = this.searchData
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(
        (filter: string) => 
        { 
           filter = (filter ||'').trim();
           if(filter.length > 2){
              return this.contactsService.find(filter, 5);
           }
           return Observable.of<string[]>([]);
        });
  }


  @HostListener('input', ['$event']) oninput(event: any) {
    console.log(event.target.value);
    this.searchData.next(event.target.value);
  }

  private selectItem(value:string) {
    this.viewContainerRef.element.nativeElement.value = value;
    this.searchData.next(undefined); 
  }

  public ngAfterViewInit() {
    //обернем input div-ом
    let el = this.viewContainerRef.element.nativeElement;
    let divEl = document.createElement("div");
    divEl.className = "typeahead";
    el.parentElement.insertBefore(divEl, el.nextSibling);
    divEl.appendChild(el);
    //и к этому div-у добавим content
    divEl.appendChild(this.content.nativeElement);
  }
}
