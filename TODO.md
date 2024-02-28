
## All files

- [ ] Replace TODO instances

## `package.json`

- [ ] Remove these dependencies if this isn't a word game:
  - @skedwards88/word_lists
  - @skedwards88/word_logic
  - @babel/plugin-syntax-import-assertions
- [ ] Remove these dependencies if they aren't needed:
  - seedrandom
  - lodash.clonedeep
- [ ] Potentially bump package versions
- [ ] Run `npm install`

## `.gitignore`

- [ ] Remove `package-lock.json` and associated comment

## `index.js`

- [ ] If this app uses a custom url instead of the default GitHub Pages url, adjust the `path` and `scope` variables

## `.github/ISSUE_TEMPLATE`

- [ ] Remove these templates if they aren't needed:
  - `.github/ISSUE_TEMPLATE/add_word.yaml`
  - `.github/ISSUE_TEMPLATE/remove_word.yaml`
- [ ] Add any other desired issue templates

## `.github/workflows`

- [] If this is a word game, add the `repository_dispatch` trigger to the `.github/workflows/deploy.yml` workflow
- [] If this is a word game, add the steps to update the word list to the `.github/workflows/deploy.yml` workflow
- [ ] In your GitHub Pages settings, specify that GitHub Pages is built from GitHub Actions.

## `jest.config.cjs`

- [ ] If this is not a word game, remove the transform ignore patterns for the word packages

## `README`

- [ ] Customize this for the game

## `index.html`

- [ ] Adust the theme color
- [ ] Adjust the name and description

## `manifest.json`

- [ ] If using a custom url, update `start_url`
- [ ] Update `name`
- [ ] Update `short_name`
- [ ] Update `description`
- [ ] Update `id`
- [ ] Change or remove `orientation` if needed
- [ ] Update `background` and `theme_color`
- [ ] Update `categories`
- [ ] Update `icons`
- [ ] Update `screenshots`

## `src/images`

- [ ] Add an svg favicon and reflect it in:
  - [ ] `index.html`
  - [ ] `manifest.json`
  - [ ] `webpack.config.js`
- [ ] Delete unneeded icons
- [ ] Add a maskable icon, screenshots, and PNG icons and reflect them in:
  - [ ] `index.html`
  - [ ] `manifest.json`
  - [ ] `webpack.config.js`

## `src/components/Heart.js`

- [ ] If this isn't a word game, remove the word data attribution

## Custom domains

- [ ] If you are using a custom domain, follow the steps in https://github.com/skedwards88/react-base?tab=readme-ov-file#custom-domain-name

## PWA

- [ ] Use Lighthouse in Chrome developer tools to verify that the app is installable and meets PWA requirements.

## Google Analytics

- [ ] See https://github.com/skedwards88/react-base?tab=readme-ov-file#google-analytics
