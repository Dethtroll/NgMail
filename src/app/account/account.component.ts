import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStorageService } from './../auth-storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  login: string = "dethtroll";
  password: string = "password";

  constructor(private authStorageService: AuthStorageService, private router: Router) { }

  ngOnInit() {
  }

  signIn(){
    this.authStorageService.isLoggedIn = true;
    this.router.navigate(['']);
  }

}
