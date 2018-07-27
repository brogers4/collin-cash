import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrDefaultPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'orDefault',
})
export class OrDefaultPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    return (typeof value === "undefined" || value === null) ? args[0] : value;
  }
}
