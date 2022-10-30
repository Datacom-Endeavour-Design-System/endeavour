import { getSvgComponent } from './icon-provider';

describe('dynamic find svg', () => {
  it('finds known svg component', () => {
    expect(getSvgComponent('search')).toBeDefined();
  });  

  it('finds known svg component with hypenated name', () => {
    expect(getSvgComponent('external-link')).toBeDefined();
  });    

  it('throws exception if name is not passed', () => {
    expect(() => getSvgComponent(undefined)).toThrow();
  });    

  it('does not find unknown svg component', () => {
    expect(() => getSvgComponent('xxxxxx')).toThrow();
  });    
});

