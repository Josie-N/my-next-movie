module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  moduleNameMapper: {
    // "axios": "axios/dist/node/axios.cjs"
    '^axios$': require.resolve('axios'),
  },
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  // transformIgnorePatterns: ["<rootDir>/node_modules/(?!axios)/"],
}
