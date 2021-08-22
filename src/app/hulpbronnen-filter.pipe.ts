import { Pipe, PipeTransform } from '@angular/core';
import { Hulpbronnen } from './hulpbronnen/hulpbronnen.model';

@Pipe({
  name: 'hulpbronnenFilter'
})
export class HulpbronnenFilterPipe implements PipeTransform {

  transform(hulpbronnen: Hulpbronnen[], naam: string): Hulpbronnen[] {
    if(!naam || naam.length === 0) {
      return hulpbronnen
    }
    return hulpbronnen.filter(hulpbron =>
      hulpbron.naam.toLowerCase().includes(naam.toLowerCase()))
  }

}
