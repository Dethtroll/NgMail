import { Injectable } from '@angular/core';

@Injectable()
export class AuthStorageService {

  public isLoggedIn: boolean = false;
  public redirectUrl: string;

  constructor() { }

}
