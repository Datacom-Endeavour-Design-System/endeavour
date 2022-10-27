import { format, pascalToDashCase } from './utils';

describe('format', () => {
  it('returns empty string for no names defined', () => {
    expect(format(undefined, undefined, undefined)).toEqual('');
  });

  it('formats just first names', () => {
    expect(format('Joseph', undefined, undefined)).toEqual('Joseph');
  });

  it('formats first and last names', () => {
    expect(format('Joseph', undefined, 'Publique')).toEqual('Joseph Publique');
  });

  it('formats first, middle and last names', () => {
    expect(format('Joseph', 'Quincy', 'Publique')).toEqual('Joseph Quincy Publique');
  });
});


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
