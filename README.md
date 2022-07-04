# pluto-i18n
This package is a tool to ease the way of adding languages texts 
## How to run it
Install the package

```npm i -D pluto-i18n```

Add this script to your package.json

```"pi18n": "node node_modules/pluto-i18n/index.js"```

Then create the jsons of the languages, wherever you want, they need to have at least an empty object

### By CLI

```npm run pi18n {action} {language_json_path} {key} {text}```

### By JSON

First you have to create an "addText.json" at the root folder, then it has to look like this

```[{ "path": "language_json_path", "key": "key", "text": "text" }]```

Then you have to run ```npm run pi18n json```

## Actions

<table>
    <thead>
        <tr>
            <th>Action</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>add</td>
        <td>Add text by CLI, up next you have to put the language json path, the key and the text</td>
    </tr>
    <tr>
        <td>json</td>
        <td>Add text by reading the addText Json </td>
    </tr>
        <tr>
        <td>remove</td>
        <td>Remove a key</td>
    </tbody>
</table>

## Optional path shortener
You can put an addTextPaths.json in the root folder to abbreviate the paths, this is useful when using the CLI, as you don't have to put the full path

```
{
    "es": "src/lib/i18n/languages/spanish.json",
    "en": "src/lib/i18n/languages/english.json",
    "pr": "src/lib/i18n/languages/portuguese.json"
}
```

The you can do:

```npm run pi18n add es hello hola``` 

or in the addText.json

```[
      { "path": "es", "key": "hello", "text": "hola" 
      { "path": "en", "key": "hello", "text": "hello" }
   ]
```
