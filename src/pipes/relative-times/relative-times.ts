import { Pipe, PipeTransform } from '@angular/core';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import fr from 'date-fns/locale/fr'


@Pipe({
  name: 'relativeTimes',
})
export class RelativeTimesPipe implements PipeTransform {
  
  transform(value: string, ...args) {
    return distanceInWordsToNow(new Date(value), { addSuffix: true, locale: fr });
  }
}
