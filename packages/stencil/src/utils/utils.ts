export function pascalToDashCase(input: string): string {
  return input
    .split(/(?=[A-Z])/g)
    .map(k => k.toLowerCase())
    .join('-');
}

export function randomString(length = 10, prefix?: string): string {
  if (length <= 0) {
    return '';
  }

  const root = window ?? global;
  if (root.crypto !== undefined) {
    const random = new Uint8Array(length);
    root.crypto.getRandomValues(random);

    return (
      (prefix || '') +
      Array.from(random)
        .map(n => n.toString(16))
        .join('')
        .substring(0, length - 1)
    );
  } else {
    const random = [];
    for (let i = 0; i < length; i++) {
      random[i] = Math.floor(Math.random() * 16);
    }

    return (prefix || '') + random.map(n => n.toString(16)).join('');
  }
}
