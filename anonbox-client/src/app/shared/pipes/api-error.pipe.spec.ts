import { ApiErrorPipe } from './api-error.pipe';
import { HttpErrorResponse } from '@angular/common/http';

describe('ApiErrorPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new ApiErrorPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should parse HttpErrorResponse correctly', () => {
    const httpErrorResponse = new HttpErrorResponse({
      error: {
        error: 'my error'
      }
    });
    expect(pipe.transform(httpErrorResponse)).toEqual('my error');
  });

  it('should parse anything that isn\'t HttpErrorResponse correctly', () => {
    const [
      t1,
      t2,
      t3
    ] = [
      pipe.transform('test'),
      pipe.transform(5),
      pipe.transform({ key: 'anything' })
    ];

    expect(t1).toEqual('test');
    expect(t2).toEqual(5);
    expect(t3).toEqual({ key: 'anything' });
  });
});
