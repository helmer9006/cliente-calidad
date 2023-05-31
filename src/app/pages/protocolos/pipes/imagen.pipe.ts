import { Pipe, PipeTransform } from '@angular/core';
import { Area } from '../../../shared/models';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(area: Area): string {
    return area.imagen ? `${area.imagen}` : 'assets/images/folder2.png';
  }
}
