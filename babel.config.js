module.exports = {
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-async-to-generator",
    [
      "module-resolver",
      {
        root: ["./frontend/js"],
        alias: {
          "~": "./frontend/js"
        }
      }
    ]
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage"
      }
    ]
  ]
}
