
## All files

- [ ] Replace TODO instances

## `package.json`

- [ ] Remove these dependencies if they aren't needed:
  - seedrandom
  - lodash.clonedeep
- [ ] Potentially bump package versions
- [ ] Run `npm install`

## `.github/workflows`

- [] If this is a word game, add the `repository_dispatch` trigger to the `.github/workflows/deploy.yml` workflow
  - [ ] Also add the word game to the [`word_list` package workflow](https://github.com/skedwards88/word_lists/blob/3126cc2fcc997468ea0d642d853aa5b74c174836/.github/workflows/package.yml#L60)
- [] If this is a word game, add the steps to update the word list to the `.github/workflows/deploy.yml` workflow
- [ ] In your GitHub Pages settings, specify that GitHub Pages is built from GitHub Actions.

## `README`

- [ ] Customize this for the game

## `index.html`

- [ ] Adust the theme color
- [ ] Adjust the name and description

## `manifest.json`

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
  - [ ] update `start_url` in `manifest.json`
  - [ ] adjust the `path` and `scope` variables in `index.js`
  - [ ] update the URLs in `privacy.html` and in `src/components/Heart`

## PWA

- [ ] Use Lighthouse in Chrome developer tools to verify that the app is installable and meets PWA requirements.

## Google Analytics

- [ ] See https://github.com/skedwards88/react-base?tab=readme-ov-file#google-analytics
- [ ] Update the `G_TODO` id in `index.html`
