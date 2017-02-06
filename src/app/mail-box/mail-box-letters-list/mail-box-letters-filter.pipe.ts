import { Pipe, PipeTransform } from '@angular/core';

import { Letter } from './../../domain/letter'

@Pipe({
  name: 'mailBoxLettersFilter'
})
export class MailBoxLettersFilterPipe implements PipeTransform {

  transform(letters: Letter[], filter: string): Letter[] {
    if(filter){
      letters = letters.filter(x => 
        x.subject.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || x.body.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || x.to.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || x.from.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    }

    return letters;
  }

}
