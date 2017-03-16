require("babel-core/register")({
  "presets": [
    "es2015",
    "stage-0"
  ],
  "plugins": ["transform-decorators-legacy"]
});
require("./app.js");
