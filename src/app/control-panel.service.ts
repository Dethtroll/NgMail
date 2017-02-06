import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { AppMode } from './domain/appMode';

@Injectable()
export class ControlPanelService {
  private _appModeChanged: Subject<AppMode> = new Subject<AppMode>();
  private _searchValueChanged: Subject<string> = new Subject<string>();

  private _selectedCountChanged: Subject<number> = new Subject<number>();
  private _selectAll: Subject<void> = new Subject<void>();
  private _selectNone: Subject<void> = new Subject<void>();

  private _deleteRequested: Subject<void> = new Subject<void>();
  private _navigateBack: Subject<void> = new Subject<void>();

  get appModeChanged(): Subject<AppMode> { return this._appModeChanged; }
  get searchValueChanged(): Subject<string> { return this._searchValueChanged; }
  
  get selectedCountChanged(): Subject<number> { return this._selectedCountChanged; }
  get selectedAll(): Subject<void> { return this._selectAll; }
  get selectedNone(): Subject<void> { return this._selectNone; }

  get deleteRequested(): Subject<void> { return this._deleteRequested; }
  get navigateBack(): Subject<void> { return this._navigateBack; }

  appModeChange(value: AppMode): void { this._appModeChanged.next(value); }
  searchValueChange(value: string): void { return this._searchValueChanged.next(value); }
  
  selectedCountChange(value: number): void { console.log(value); return this._selectedCountChanged.next(value); }
  selectAllRaise(): void { return this._selectAll.next(); }
  selectNoneRaise(): void { return this._selectNone.next(); }

  deleteRaise(): void { return this._deleteRequested.next(); }
  navigateBackRaise(): void { return this._navigateBack.next(); }

  constructor() {
  }

  
}
