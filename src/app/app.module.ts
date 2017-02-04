import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactsBookComponent } from './contacts-book/contacts-book.component';
import { MessageEditorComponent } from './mail-box/message-editor/message-editor.component';
import { MessageViewerComponent } from './mail-box/message-viewer/message-viewer.component';
import { MailBoxComponent } from './mail-box/mail-box.component';
import { MailBoxListComponent } from './mail-box/mail-box-list/mail-box-list.component';
import { MailBoxLettersListComponent } from './mail-box/mail-box-letters-list/mail-box-letters-list.component';
import { ReplyFormComponent } from './mail-box/message-viewer/reply-form/reply-form.component';

// определение маршрутов
const appRoutes: Routes =[
    { path: '', component: MailBoxComponent},
    { path: 'mailbox/:mailBoxId', component: MailBoxComponent,
      children:[
        { path: '', component: MailBoxLettersListComponent },
        { path: 'new', component: MessageEditorComponent},
        { path: 'view/:letterId', component: MessageViewerComponent}
      ]},
    { path: 'contacts', component: ContactsBookComponent},
    { path: '**', component: MailBoxComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MessageEditorComponent,
    MessageViewerComponent,
    MailBoxComponent,
    MailBoxListComponent,
    MailBoxLettersListComponent,
    ReplyFormComponent,
    ContactsBookComponent,
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
