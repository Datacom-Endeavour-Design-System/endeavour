export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function pascalToDashCase(input: string): string {
  return input
        .split(/(?=[A-Z])/g)
        .map(k => k.toLowerCase())
        .join('-');
}