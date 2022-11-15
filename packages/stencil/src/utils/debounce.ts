type Func = (...params: unknown[]) => void;

export function debounce(func: Func, delay = 100): Func {
  let timer: number;

  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      clearTimeout(timer);
      func(args);
    }, delay);
  };
}
