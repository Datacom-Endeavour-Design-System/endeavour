export function pascalToDashCase(input: string): string {
  return input
        .split(/(?=[A-Z])/g)
        .map(k => k.toLowerCase())
        .join('-');
}