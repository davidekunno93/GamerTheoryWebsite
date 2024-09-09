# Quick start the web app on your local machine:

After completing a git clone to your local machine. Complete the following commands in your terminal:
- npm install
- npm run dev


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list




## Up next:

- Console page
<!-- Make consoles scroll horizontally -- modularize -->
<!-- *Create Xbox and Nintendo data that can be used to render the console page - bannerObjects, consoleProducts, filterOptions index = 0 dropdown, and get console strip images for product card -->
On load, smooth scroll to after hero section?
Create Price Range slider
<!-- Change hero section dot colors for each console. PS = blue, Xbox = green, Nintendo = red -->
get each consoles console-strip load in productCard component
update getGames with filter options - new api call for each confirmed update (have re-search btn)
--- console, genre, minRating?, esrbRating?
page clicks reload api updating request page
console product > nav to product page
Search game by name
Banner links go to relevant product
update api search if platform changes + reset filters

- Product Page
<!-- *Design and create Product page for video games/console items -->

- Checkout page
...
Dropdown cart popup

- Favorites page
...

- Footer
...

Spotify api to get audio files - get playlist music, capture the audio files in a state object
api call > adele 21 album (11 tracks)
album id = 0Lg1uZvI312TPqxNWShFXL
in response object target items: track[] > preview_url for short audio file (30 secs)
api call url for album JSON object: https://api.spotify.com/v1/albums/https://api.spotify.com/v1/albums/0Lg1uZvI312TPqxNWShFXL
client ID: c08c5eeaab964226aa607cd651257268
client secret: 664a728c7fe1442eb0fec1508e14a9ce
<!-- Send client credentials to get access token to make api request -->
Authorization: Basic <base64 encoded client_id:client_secret>
Content-Type: application/x-www-form-urlencoded
grant_type: 'client_credentials'