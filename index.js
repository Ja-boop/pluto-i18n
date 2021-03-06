const fs = require("fs");
const os = require("os");

const firstParam = process.argv[2];
const language = process.argv[3];
const key = process.argv[4];
const text = process.argv[5];

function addText(path, key, text) {
  try {
    let jsonPath;
    let pathsJson;

    if (fs.existsSync("addTextPaths.json")) {
      pathsJson = JSON.parse(fs.readFileSync("addTextPaths.json", "utf-8"));

      if (fs.existsSync(pathsJson[path])) {
        jsonPath = pathsJson[path];
      }
    }

    if (fs.existsSync(path)) {
      jsonPath = path;
    } else if (fs.existsSync(language)) {
      jsonPath = language;
    }

    const languageJson = fs.readFileSync(jsonPath, {
      encoding: "utf8",
      flag: "r",
    });
    const parsedJson = JSON.parse(languageJson);

    parsedJson[key.toUpperCase()] = text;
    const ordered = Object.keys(parsedJson)
      .sort()
      .reduce((accumulator, key) => {
        accumulator[key] = parsedJson[key];

        return accumulator;
      }, {});
    const stringifyLanguage = JSON.stringify(ordered, null, 4);
    fs.writeFileSync(jsonPath, stringifyLanguage + os.EOL);
  } catch (e) {
    console.log(e);
  }
}

function removeKey() {
  try {
    if (language && key) {
      let jsonPath;
      let pathsJson;

      if (fs.existsSync("addTextPaths.json")) {
        pathsJson = JSON.parse(fs.readFileSync("addTextPaths.json", "utf-8"));
        if (fs.existsSync(pathsJson[language])) {
          jsonPath = pathsJson[language];
        }
      }

      if (fs.existsSync(language)) {
        jsonPath = language;
      }

      const languageJson = fs.readFileSync(jsonPath, {
        encoding: "utf8",
        flag: "r",
      });
      const parsedJson = JSON.parse(languageJson);

      delete parsedJson[key.toUpperCase()];
      const ordered = Object.keys(parsedJson)
        .sort()
        .reduce((accumulator, key) => {
          accumulator[key] = parsedJson[key];

          return accumulator;
        }, {});
      const stringifyLanguage = JSON.stringify(ordered, null, 4);
      fs.writeFileSync(jsonPath, stringifyLanguage + os.EOL);
    }
  } catch (error) {
    console.log(error);
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
