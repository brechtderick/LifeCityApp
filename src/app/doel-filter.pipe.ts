import { Pipe, PipeTransform } from '@angular/core';
import { Doel } from './doelen/doel.model';

@Pipe({
  name: 'doelFilter'
})
export class DoelFilterPipe implements PipeTransform {

  transform(doel: Doel[], naam:string): Doel[] {
    if(!naam || naam.length === 0) {
      return doel
    }
    return doel.filter(doel =>
      doel.naam.toLowerCase().includes(naam.toLocaleLowerCase()))
  }

}
