# express-server-template-postgresql
A server/backend template using [Express](https://expressjs.com/)
and PostgreSQL as the database.

Made for a friend~

## Hard Requirements
- Node.js  
  https://nodejs.org/en/download
- PostgreSQL  
  https://www.postgresql.org/download/

## Recommended Visual Studio Code Extensions
- **REST Client** (`humao.rest-client`)  
  by Huachao Mao  
  *REST Client for Visual Studio Code*  
  https://marketplace.visualstudio.com/items?itemName=humao.rest-client
- **Error Lens** (`usernamehw.errorlens`)  
  by Alexander  
  *Improve highlighting of errors, warnings and other language diagnostics.*  
  https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens
- **StandardJS - JavaScript Standard Style** (`standard.vscode-standard`)  
  by Standard  
  *Visual Studio Code extension for JavaScript Standard Style with automatic fixing.*  
  https://marketplace.visualstudio.com/items?itemName=standard.vscode-standard

## Getting Started
You can clone this repository by clicking the green "<> Code" menu button, then clicking "Download ZIP"; or, you can enter the following command in your terminal of choice if you have [Git](https://git-scm.com/) installed:
```git
npx degit Oktalon-Szoradi/express-server-template-postgresql my-server
```
This will clone the repository into a new folder called `my-server`. Feel free to rename.

---

Ensure that PostgreSQL is running on your system and that you've created a database.

Fill out the `.env` file. If the password contains special characters, then it must be in quotes.

---

Install dependencies with
```sh
npm i
```

Start with automatic reloading upon changes (for development)
```sh
npm run dev
```

Lint with [Standard](https://standardjs.com/)
```sh
npm run lint
```

Start project as-is and do not auto-reload upon changes (for production)
```sh
npm run start
```

See `package.json` to edit these scripts.

---

More help is available in [TUTORIAL.md](./TUTORIAL.md).

# License
This repository is licensed under the [Unlicense](https://unlicense.org/) "license". More details in [LICENSE](./LICENSE).

*I dedicate any and all copyright interest in this software to the
public domain. I make this dedication for the benefit of the public at
large and to the detriment of my heirs and successors. I intend this
dedication to be an overt act of relinquishment in perpetuity of all
present and future rights to this software under copyright law.*

You have the freedom to do whatever you want with this repository. There is no need to credit me, but you can do so if you wish. Absolutely no warranty or guarantee of any kind is provided.
