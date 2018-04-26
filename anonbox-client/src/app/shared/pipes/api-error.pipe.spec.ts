import { ApiErrorPipe } from './api-error.pipe';

describe('ApiErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new ApiErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
