import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthStorageService {

  private _isLoggedIn: boolean = false;

  public readonly LoggedInSubject: Subject<boolean> = new Subject<boolean>();
  public redirectUrl: string;

  public get isLoggedIn(): boolean { return this._isLoggedIn; }
  public set isLoggedIn(value :boolean) { this._isLoggedIn = value; this.LoggedInSubject.next(value); }

  constructor() { }
}
