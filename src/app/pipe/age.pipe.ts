import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Age'
})
export class AgePipe implements PipeTransform {

  transform(value: any): any {

    let currentYear: any = new Date().getFullYear();
    let dob: any = new Date(value).getFullYear();
    let Age = currentYear-dob;
    
    
    return Age;
  }

}
