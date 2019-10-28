import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'active' })
export class ActivePipe implements PipeTransform {
  constructor() {
  }

  transform(value: boolean): string {
    return value ? 'Yes' : 'No';
  }
}
