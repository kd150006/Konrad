import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {
  transform(items: any[], filterStatus: string): any[] {
    if (!items) {
      return [];
    }
    if (!filterStatus) {
      return items;
    }

    filterStatus = filterStatus.toLowerCase();

    return items.filter(
      item =>
        item.status.toLowerCase().includes(filterStatus)
    );
  }
}
