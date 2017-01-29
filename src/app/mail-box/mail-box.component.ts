import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css']
})
export class MailBoxComponent implements OnInit {

  constructor(private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.route.params.subscribe((params)=> console.log(params));
  }

}
