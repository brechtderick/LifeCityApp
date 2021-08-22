import { Pipe, PipeTransform } from '@angular/core';
import { Emotieregulatie } from './emotieregulatie/emotieregulatie.model';

@Pipe({
  name: 'emotieFilter'
})
export class EmotieFilterPipe implements PipeTransform {

  transform(emoties: Emotieregulatie[], beschrijving: string): Emotieregulatie[] {
    if (!beschrijving || beschrijving.length === 0) {
      return emoties
    }
    return emoties.filter(emotie =>
      emotie.beschrijving.toLowerCase().includes(beschrijving.toLowerCase()))
  }

}
