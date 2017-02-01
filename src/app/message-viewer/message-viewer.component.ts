import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageViewerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
