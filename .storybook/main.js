const path = require('path');

module.exports = {
  "stories": [
    "../src/components/**/stories.tsx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-next-router"
  ],
  "webpackFinal": async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "components": path.resolve(__dirname, "../src/components"),
      "services": path.resolve(__dirname, "../src/services"),
      "styles": path.resolve(__dirname, "../src/styles"),
    };

    return config;
  }
}
