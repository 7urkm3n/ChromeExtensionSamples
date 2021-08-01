#### This repo is bioler plate to start developing Chrome Extension app with `ReactJS` or `SolidJS` (both uses TSX - TypeScript)

> The repo createdAt `1st Aug, 2021`, make sure to update newer version.

####Lets do it:
Make sure before to start:
editing files based on framework.

If wants to use `ReactJS` or `SolidJS`

**ReactJS:**

1.  rename `package.reactjs.json` to `package.json`, and delete `package.solidjs.json` file.
2.  Goto Webpack folder and rename `webpack.common_reactjs.js` to `webpack.common.js`, and remove `solidjs.js` file.
3.  Goto `tsconfig.json` and update `"jsx": "react"` and remove `"jsxImportSource": "solid-js"`

**SolidJS:**

1.  rename `package.solidjs.json` to `package.json`, and delete `package.reactjs.json` file.
2.  Goto Webpack folder and rename `webpack.common_solidjs.js` to `webpack.common.js`, and remove `common_reactjs` file.

3) No need to update `tsconfig.json`, its already written for `solidJS`

Once files being renamed, install packages `yarn` or `npm i`.

**Use:\***

1. `yarn start` or `npm start` (it will build `dist` folder)
2. Go to chrome://extensions/
3. Toggle Developer mode, right top corner.
4. Click Load unpacked
5. Chose the location of the project and pick `dist` folder. (it will contain `manifest.json`)

6. Hola, enjoy :)
