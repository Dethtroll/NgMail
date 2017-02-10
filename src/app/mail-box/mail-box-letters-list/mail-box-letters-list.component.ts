import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Letter } from './../../domain/letter';

import { MailBoxLettersService } from './../mail-box-letters.service';
import { ControlPanelService } from './../../control-panel.service';

@Component({
  selector: 'app-mail-box-letters-list',
  templateUrl: './mail-box-letters-list.component.html',
  styleUrls: ['./mail-box-letters-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MailBoxLettersListComponent implements OnInit, OnDestroy {

  filterValue: string = null;
  letters: Letter[];
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

  constructor(
    private route: ActivatedRoute, 
    private router:Router, 
    private letterService: MailBoxLettersService,
    private controlPanel: ControlPanelService) { }

  ngOnInit(): void {
    this.selectedCount = 0;
    this.route.params.subscribe((params:any)=> {
      this.letters = [];
      if(params.mailBoxId != undefined)
      {
        this.letterService.getAll(params.mailBoxId)
          .subscribe(item => { this.letters.push(item); });
      }
    });

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

  viewMessageRequested(letter: Letter): void {
    this.router.navigate(["/mailbox", letter.mailbox, "view", letter._id]);
  }

  selectChanged(value: boolean) {
    this.selectedCount = this.selectedCount + (value ? 1 : -1);
    return false;
  }

  deleteRequested(letter: Letter) {
    this.deleteLetters([letter]);
    return false;
  }

  deleteSelectedRequested() {
    let needDelete = this.letters.filter(letter => letter.isChecked);
    this.deleteLetters(needDelete);
  }

  private deleteLetters(needDelete: Letter[]) {
    this.letterService.delete(needDelete)
      .subscribe((responce: string) => {
        let index = this.letters.findIndex((current: Letter) => current._id == responce);
        if(index >=0 ) {
          if(this.letters[index].isChecked) {
            this.selectedCount--;
          }

          this.letters.splice(index, 1);
        }
      });
  }

  selectAllRequested(){
    this.letters.forEach(value => value.isChecked = true);
    this.selectedCount = this.letters.length;
  }

  selectNoneRequested(){
    this.letters.forEach(value => value.isChecked = false);
    this.selectedCount = 0;
  }
}
