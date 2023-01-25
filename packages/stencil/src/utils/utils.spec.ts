import { pascalToDashCase, randomString } from './utils';

describe('pascal to dash case', () => {
  it('splits two words', () => {
    expect(pascalToDashCase('BigCat')).toEqual('big-cat');
  });

  it('splits three words', () => {
    expect(pascalToDashCase('BigRedCat')).toEqual('big-red-cat');
  });

  it('does not split single word', () => {
    expect(pascalToDashCase('Big')).toEqual('big');
  });
});

describe('Random string Util', () => {
  it('generates correct length word', () => {
    expect(randomString(12)).toHaveLength(12);
  });

  it('generates empty string for length zero', () => {
    expect(randomString(0)).toHaveLength(0);
  });

  it('generates empty string for negative length', () => {
    expect(randomString(-9)).toHaveLength(0);
  });

  /* TODO test with crypto library */
});
