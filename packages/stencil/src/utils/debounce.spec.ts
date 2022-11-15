import { debounce } from './debounce';

jest.useFakeTimers();

describe('debounce', () => {
  it('is called only once', () => {
    const target = jest.fn();

    debounce(target, 100)();
    debounce(target, 100)();
    debounce(target, 100)();

    expect(target).toHaveBeenCalledTimes(1);
  });
});
