const fs = require("fs");

const firstParam = process.argv[2];
const language = process.argv[3];
const key = process.argv[4].toUpperCase();
const text = process.argv[5];
const paths = JSON.parse(fs.readFileSync("addTextPaths.json", "utf-8"));

function addText(path, key, text) {
  const languageJson = paths[path] || language;
  fs.readFile(languageJson, (e, data) => {
    if (e) throw e;
    const languageJSON = JSON.parse(data);
    languageJSON[key] = text;

    const ordered = Object.keys(languageJSON)
      .sort()
      .reduce((accumulator, key) => {
        accumulator[key] = languageJSON[key];

        return accumulator;
      }, {});
    const stringifyLanguage = JSON.stringify(ordered, null, 2);
    fs.writeFileSync(languageJson, stringifyLanguage);
  });
}

function removeKey() {
  if (language && key) {
    const languageJson = paths[language] || language;
    fs.readFile(languageJson, (e, data) => {
      if (e) throw e;
      const languageJSON = JSON.parse(data);
      delete languageJSON[key];

      const ordered = Object.keys(languageJSON)
        .sort()
        .reduce((accumulator, key) => {
          accumulator[key] = languageJSON[key];

          return accumulator;
        }, {});
      const stringifyLanguage = JSON.stringify(ordered, null, 2);
      fs.writeFileSync(languageJson, stringifyLanguage);
    });
  }
}

function addFromJSON() {
  const texts = JSON.parse(fs.readFileSync("addText.json", "utf-8"));
  for (const textData of texts) {
    addText(textData.path, textData.key, textData.text);
  }
}

function addFromParams() {
  if (language && key && text) {
    addText(language, key, text);
  }
}

async function app() {
  switch (firstParam) {
    case "json":
      addFromJSON();
      break;
    case "add":
      addFromParams();
      break;
    case "remove":
      removeKey();
      break;
    default:
      break;
  }
}

app();
