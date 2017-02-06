import { Pipe, PipeTransform } from '@angular/core';

import { ContactDto } from './contactDto';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {

  transform(contacts: ContactDto[], filter: string): ContactDto[] {
    if(filter){
      contacts = contacts.filter(x => 
        x.email.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || x.fullName.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    }

    return contacts;
  }
}
