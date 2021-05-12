import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fisrtImages'
})
export class FisrtImagesPipe implements PipeTransform {

  transform(images: any[]): any[] {
     if(images.length<=4)
     {
       return images;
     }
     else{
       return images.slice(0,4)
     }
  }

}
