/**
 * Created by jin on 2/6/18.
 */
import { Pipe, PipeTransform } from '@angular/core'


@Pipe({
    name: 'sort'
})
export class ArraySortPipe  implements PipeTransform {
    transform(array: any[], field: string): any[] {

        array.sort( (a: any, b: any) => {

            const ae = a[ field ]
            const be = b[ field ]

            if (!ae && !be) {
                return 0
            }

            if ( ae < be) {
                return -1;
            } else if (a[field] > b[field]) {
                return 1
            } else {
                return 0
            }
        })

        return array
    }
}
