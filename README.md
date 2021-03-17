# CSC4990GART

## File structure
Here is a simplified file structure of the project. Project is based on [this](https://github.com/adrianhajdin/project_mern_memories/tree/PART_3) project recommended by @JZipse . More information about each file are found at the top.

## Client Side
```
📦gart-app
┣ 📂node_modules
┣ 📂public
┣ 📂src
┃ ┣ 📂actions //redux store
┃ ┃ ┗ 📜auth.js
┃ ┣ 📂api //axios request
┃ ┃ ┗ 📜index.js
┃ ┣ 📂constants //constant variables
┃ ┃ ┣ 📜actionTypes.js
┃ ┃ ┗ 📜constants.js
┃ ┣ 📂pages //all components 
┃ ┃ ┣ 📂images
┃ ┃ ┣ 📂styles
┃ ┃ ┣ 📜404.jsx
┃ ┃ ┣ 📜index.jsx
┃ ┃ ┣ 📜login.jsx
┃ ┃ ┣ 📜mainpage.jsx
┃ ┃ ┣ 📜placeholder.svg
┃ ┃ ┗ 📜register.jsx
┃ ┣ 📂reducers //redux store (stores tokens / handle logout)
┃ ┃ ┣ 📜auth.js
┃ ┃ ┗ 📜index.js
┃ ┣ 📜App.js //routes
┃ ┣ 📜index.js
┣ 📜package.json
┣ 📜README.md

```
## Server Side
```
📦server
┣ 📂controllers (controls data models)
┃ ┗ 📜posts.js
┣ 📂middleware (middleware functions )
┃ ┗ 📜auth.js
┣ 📂models (structures database)
┃ ┣ 📜postMessage.js
┃ ┗ 📜users.js
┣ 📂routes (sets routes)
┃ ┣ 📜auth.js
┃ ┣ 📜posts.js
┃ ┗ 📜token_verification.js
┣ 📂utils (misc functions)
┃ ┗ 📜constants.js
┣ 📜.env
┣ 📜package.json
┣ 📜server.js
┗ 📜validation.js
```