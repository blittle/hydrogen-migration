const fs = require('fs');
const path = require('path');

const fileCount = 100;
const promises = [];

const memoryLogging = `
const used = process.memoryUsage();
let memory = '';
for (let key in used) {
  memory += \`\${key} \${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB\n\`;
}
`;

fs.mkdirSync(path.resolve(process.cwd(), 'src/pages/generated'));

for (let i = 0; i < fileCount; i++) {
  promises.push(createBasicPage(i));
  promises.push(createParamsPage(i));
}

Promise.all(promises)
  .then(() => console.log('Finished'))
  .catch((error) => console.error(error));

function createBasicPage(i) {
  const fileName = `gen${i}.server.jsx`;
  const content = `export default function () {
  ${memoryLogging}
  return (
    <div>
    <h1>
      Template for <i>${fileName}</i>
    </h1>
      <pre>{memory}</pre>
    </div>
  );
}
`;

  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.resolve(process.cwd(), 'src/pages/generated/' + fileName),
      content,
      (err) => {
        if (err) reject(err);
        else resolve();
      },
    );
  });
}

function createParamsPage(i) {
  const fileName = `[handle].server.jsx`;
  const content = `export default function ({params}) {
  ${memoryLogging}
  const {handle} = params;
  return (
    <div>
        <h1>
        Template for <i>[handle].server.jsx</i>:<i>{handle}</i>
        </h1>
        <pre>{memory}</pre>
    </div>
  );
}
`;

  return new Promise((resolve, reject) => {
    fs.mkdir(path.resolve(process.cwd(), `src/pages/generated/${i}`), (err) => {
      if (err) reject(err);
      else {
        fs.writeFile(
          path.resolve(process.cwd(), `src/pages/generated/${i}/` + fileName),
          content,
          (err) => {
            if (err) reject(err);
            else resolve();
          },
        );
      }
    });
  });
}
