module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: "3"
      }
    ],
    ["@babel/preset-typescript"],
    [
      "@babel/preset-react",
      {
        development: true
      }
    ]
  ],
  plugins: [["@babel/plugin-transform-runtime"], "@babel/plugin-syntax-dynamic-import"]
};
