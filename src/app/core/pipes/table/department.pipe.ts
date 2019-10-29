import { Pipe, PipeTransform } from '@angular/core';
import { Department } from '../../models/department.model';

@Pipe({ name: 'departmentName' })
export class DepartmentNamePipe implements PipeTransform {
  transform(value: number, departments: Department[]): string {
    return departments.find(department => department.id === value).name;
  }
}
