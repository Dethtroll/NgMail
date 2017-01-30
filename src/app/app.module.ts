import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { MessageEditorComponent } from './message-editor/message-editor.component';
import { MessageViewerComponent } from './message-viewer/message-viewer.component';
import { MailBoxComponent } from './mail-box/mail-box.component';
import { MailBoxListComponent } from './mail-box/mail-box-list/mail-box-list.component';
import { MailBoxLettersListComponent } from './mail-box/mail-box-letters-list/mail-box-letters-list.component';

// определение маршрутов
const appRoutes: Routes =[
    { path: '', component: MailBoxComponent},
    { path: 'mailbox/:id', component: MailBoxComponent,
      children:[
        { path: '', component: MailBoxLettersListComponent },
        { path: 'edit', component: MessageEditorComponent},
        { path: 'view/:id', component: MessageViewerComponent}
      ]},
    { path: 'addresses', component: AddressBookComponent},//,
    //{ path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AddressBookComponent,
    MessageEditorComponent,
    MessageViewerComponent,
    MailBoxComponent,
    MailBoxListComponent,
    MailBoxLettersListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
