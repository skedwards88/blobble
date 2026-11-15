module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  // ignore all node modules except @skedwards88/word_lists and @skedwards88/word_logic and @skedwards88/shared-components
  transformIgnorePatterns: [
    "/node_modules/(?!@skedwards88/word_lists|@skedwards88/word_logic|@skedwards88/shared-components)",
  ],
};
