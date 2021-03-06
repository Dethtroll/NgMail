import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
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
import { ContactListComponent } from './contacts-book/contact-list/contact-list.component';
import { AddContactComponent } from './contacts-book/add-contact/add-contact.component';
import { ContactFilterPipe } from './contacts-book/contact-list/contact-filter.pipe';
import { MailBoxLettersFilterPipe } from './mail-box/mail-box-letters-list/mail-box-letters-filter.pipe';
import { ContactTypeaheadDirective } from './mail-box/message-editor/contact-typeahead.directive';
import { AccountComponent } from './account/account.component';
import { AuthStorageService } from './auth-storage.service';
import { AuthGuardService } from './auth-guard.service';

// определение маршрутов
const defaultMailBox = '58920c6c9de15a250410f6ba';
const appRoutes: Routes =[
    { path: '', redirectTo: '/mailbox/'+defaultMailBox, pathMatch: 'full'},
    { path: 'login', component: AccountComponent },

    { path: 'mailbox/:mailBoxId', component: MailBoxComponent,    canLoad: [AuthGuardService], canActivate : [AuthGuardService], canActivateChild : [AuthGuardService],
      children:[
        { path: '', component: MailBoxLettersListComponent },
        { path: 'new', component: MessageEditorComponent},
        { path: 'view/:letterId', component: MessageViewerComponent}
      ]},
    { path: 'contacts', component: ContactsBookComponent,         canLoad: [AuthGuardService], canActivate : [AuthGuardService], canActivateChild : [AuthGuardService] },
    { path: '**', redirectTo: '/mailbox/'+defaultMailBox }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  declarations: [
    ContactFilterPipe,
    MailBoxLettersFilterPipe,
    ContactTypeaheadDirective,
    ReplyFormComponent,
    MessageViewerComponent,
    MessageEditorComponent,
    MailBoxLettersListComponent,
    MailBoxListComponent,
    MailBoxComponent,
    AddContactComponent,
    ContactListComponent,
    ContactsBookComponent,
    AccountComponent,
    AppComponent,
  ],
  providers: [ AuthStorageService, AuthGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
