import { Pipe, PipeTransform } from '@angular/core';
import { Levenslijn } from './levenslijn/levenslijn.model';

@Pipe({
  name: 'levenslijnFilter'
})
export class LevenslijnFilterPipe implements PipeTransform {

  transform(levenslijn: Levenslijn[], naam: string): Levenslijn[] {
    if(!naam || naam.length === 0) {
      return levenslijn
    }
    return levenslijn.filter(levenslijn =>
      levenslijn.naam.toLowerCase().includes(naam.toLowerCase()))
  }

}
