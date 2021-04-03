import gendiff from '../src/index.js';

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('flat files diff', () => {
  expect(gendiff('./1.json', './2.json')).toEqual(result);
});
