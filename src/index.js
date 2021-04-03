import path from 'path';
import fs from 'fs';

export default (filepath1, filepath2) => {
  const file1Content = fs
    .readFileSync(path.resolve(process.cwd(), filepath1))
    .toString();
  const file2Content = fs
    .readFileSync(path.resolve(process.cwd(), filepath2))
    .toString();
  const file1 = JSON.parse(file1Content);
  const file2 = JSON.parse(file2Content);
  let result = '{';
  for (const field in file2) {
    if (file1[field]) {
      if (file1[field] === file2[field]) {
        result += `\r\n   ${field}: ${file1[field]}`;
        continue;
      }
      result += `\r\n - ${field}: ${file1[field]}\r\n + ${field}: ${file2[field]}`;
      continue;
    }

    result += `\r\n + ${field}: ${file2[field]}`;
  }
  for (const field in file1) {
    if (!file2[field]) {
      result += `\r\n - ${field}: ${file1[field]}`;
    }
  }

  result += '\r\n}';
  console.log(result);
};
