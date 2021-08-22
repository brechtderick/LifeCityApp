import { Pipe, PipeTransform } from '@angular/core';
import { Talenten } from './talenten/talenten.model';

@Pipe({
  name: 'talentenFilter'
})
export class TalentenFilterPipe implements PipeTransform {

  transform(talenten: Talenten[], naam: string): Talenten[] {
    if(!naam || naam.length === 0) {
      return talenten
    }
    return talenten.filter(talent =>
      talent.naam.toLowerCase().includes(naam.toLowerCase()))
  }

}
