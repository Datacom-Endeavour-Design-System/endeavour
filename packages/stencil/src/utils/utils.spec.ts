import { pascalToDashCase } from './utils';

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
