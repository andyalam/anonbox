import { Pipe, PipeTransform } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Pipe({
  name: 'apiError'
})
export class ApiErrorPipe implements PipeTransform {
  transform(value: HttpErrorResponse): HttpErrorResponse|string {
    // Angular wraps the error within .error and so does express
    // the result is .error.error...
    if (value && value.error && value.error.error) {
      const error = value.error.error;

      return Array.isArray(error)
        ? error.join(', ')
        : error;
    }

    return value;
  }
}
