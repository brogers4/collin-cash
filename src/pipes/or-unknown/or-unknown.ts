import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrUnknownPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'orUnknown',
})
export class OrUnknownPipe implements PipeTransform {
  /**
   * Determines if a value is undefined or null and if so return "Unknown"
   */
  transform(value: any, ...args) {
    return (typeof value === "undefined" || value === null ) ? "Unknown" : value;
  }
}
