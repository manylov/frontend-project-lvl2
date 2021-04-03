import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const readFile = (filepath) =>
  fs.readFileSync(path.resolve(process.cwd(), filepath)).toString();

const operations = ['-', '+', ' '];

const formater = (keysObjects) => {
  return (
    keysObjects.reduce(
      (acc, keyObject) =>
        `${acc}  ${operations[keyObject.status]} ${keyObject.key}: ${
          keyObject.value
        }\n`,
      '{\n'
    ) + '}'
  );
};

const genDiff = (obj1, obj2) => {
  const notChandedKeys = Object.keys(obj1).filter(
    (key) => obj1[key] === obj2[key]
  );

  const removedKeys = Object.keys(obj1).filter(
    (key) => !notChandedKeys.includes(key)
  );

  const addedKeys = Object.keys(obj2).filter(
    (key) => !notChandedKeys.includes(key)
  );

  const allKeysSortedByName = _.sortBy(
    [
      ...notChandedKeys.map((key) => ({
        status: 2,
        key,
        value: obj1[key],
      })),
      ...removedKeys.map((key) => ({
        status: 0,
        key,
        value: obj1[key],
      })),
      ...addedKeys.map((key) => ({
        status: 1,
        key,
        value: obj2[key],
      })),
    ],
    ['key', 'status']
  );

  return formater(allKeysSortedByName);
};

export default (filepath1, filepath2) => {
  const data1 = JSON.parse(readFile(filepath1));
  const data2 = JSON.parse(readFile(filepath2));

  return genDiff(data1, data2);
};
