[← Back to README.md](./README.md)

**Table of Contents**
- [Introduction](#introduction)
- [1. `.env`](#1-env)
- [2. Node Modules](#2-node-modules)
- [3. Creating Files](#3-creating-files)
- [4. About My Preferred Import/Export Method](#4-about-my-preferred-importexport-method)
- [5. Defining Routes](#5-defining-routes)
- [6. Writing Controllers](#6-writing-controllers)
- [7. Writing Models](#7-writing-models)
- [8. Running/Starting this Project](#8-runningstarting-this-project)
- [9. Testing using `rest.http`](#9-testing-using-resthttp)
- [Closing Notes](#closing-notes)

# Introduction
This project allows you to host a server on your computer to act as an interface with a PostgreSQL database on the same computer.

Assume you have the hard requirements installed as listed in the [README.md file](./README.md). Node.js should also come with the Node Package Manager, which can be used with the command `npm`.

The order of this tutorial is chronological.

# 1. `.env`
The `.env` file contains necessary information to connect to your PostgreSQL database. Since it contains a password, it's included in the `.gitignore` file so that it won't get pushed to the public.

Right now, you have a file called `.env.example`. Assuming you already have PostgreSQL running and have created a database, fill out the file and rename it to `.env`.

Here's an example of what the contents of the `.env` file could look like:
```
PORT=3000
PGHOST=localhost
PGUSER=postgres
PGDATABASE=mydatabase
PGPASSWORD=postgres
PGPORT=5432
```
- `PORT`  
  This is the port the server will run on. Otherwise it'll be on port 5000 as written in `src/app.js`. Before starting your server, make sure this port is not occupied by anything else (e.g. Live Server, Live Preview).
- `PGHOST`  
  The computer where PostgreSQL is running. `localhost` is the same as `127.0.0.1`, the loopback address; AKA your computer.
- `PGUSER`  
  The name of the user to connect to PostgreSQL. Usually this is just `postgres`.
- `PGDATABASE`  
  The name of the database with which your server will communicate with.
- `PGPASSWORD`  
  The password for `PGUSER`. If it contains any special characters, then you should wrap it in quotes like this:  
  `PGPASSWORD="postgres#123"`
- `PGPORT`  
  The port on which PostgreSQL is running. It's usually 5432.

# 2. Node Modules
Open up a terminal and change directory to this one. Install dependencies using the following command:
```sh
npm i
```

If you want more up-to-date packages, you can adjust the version targets of the dependencies in `package.json`. A nice Visual Studio Code extension I like to use for this is:

> **Package Json Upgrade** (`codeandstuff.package-json-upgrade`)  
by codeandstuff  
*Shows available updates in package.json files. Offers quick fix command to update them and to show the changelog.*  
https://marketplace.visualstudio.com/items?itemName=codeandstuff.package-json-upgrade

If you do this, remember to run `npm i` again.

# 3. Creating Files
Time to build your API.
The directory you'll mainly be working in is `src/`.

---

The structure being used here is called the MVC structure; MVC standing for Model-View-Controller. In this case it refers to Model-Controller-Route (or Route-Controller-Model).

**Routes**  
is where you define what requests the route should handle, like GET, POST, PATCH, and DELETE. These then call a function in a Controller.

**Controllers**  
is where you handle these requests. You check the inputs for validity and send off the parameters to a function in a Model. You can then also audit what you received from the Model and decide what you will respond back with (e.g. status code, JSON data, error message).

**Models**  
is where database communication occurs. Here you write SQL queries and return the results. You should not perform any special checks in here, as that's the job for the Controller.

---

Think of a naming scheme for your files. Examples of good schemes are:
- `{thing}{Route|Controller|Model}.js`
- `{thing}-{route|controller|model}.js`
- `{thing}.{route|controller|model}.js`

which in practice would look like:
- `productsRoute.js`
- `productsController.js`
- `productsModel.js`

or
- `products-route.js`
- `products-controller.js`
- `products-model.js`

or
- `products.route.js`
- `products.controller.js`
- `products.model.js`

where `products` could also be `users` or `fruit` or `audioArchive` or anything else.

Once you've decided on a scheme, create the files you want in their respective directories, i.e. routes should go in `src/api/routes/`, controllers should go in `src/api/controllers/`, and models should go in `src/api/models/`.

# 4. About My Preferred Import/Export Method
This repository uses the following method for importing and exporting:

`model`
```js
export const function1
export const function2
export const function3
```

`controller`
```js
import * as model from '../models/model.js'

export const function1
export const function2
export const function3
```

`routes`
```js
import * as controller from '../controllers/controller.js'

router.<...>('/', asyncHandler(controller.function1))
router.<...>('/', asyncHandler(controller.function2))
router.<...>('/', asyncHandler(controller.function3))
```

i.e. multiple exported objects (writing the `export` keyword before each function) and using the `import * as ...` syntax.

There are other methods of importing/exporting, but I prefer this method as it avoids having to always write different function names. Instead, you get to only write them once, but will have to always call them by writing `model.` or `controller.`. Even then, I find this to be clean.

# 5. Defining Routes
In `src/app.js`, look for the comment `// Import your routes here`. Underneath that line, you can import your routes, for example:
```js
import myRoute from './api/routes/myRoute.js'
import testRoute from './api/routes/testRoute.js'
```

Then, look further below for the comment `// Use your routes here`. Underneath that line, you assign the files to routes of your choosing, for example:
```js
app.use('/myRoute', myRoute)
app.use('/test', testRoute)
```

If you want to use just one routes file, then you can write
```js
app.use('/', allRoutes)
```

**Careful!** If you were to write
```js
app.use('/', myRoute)
app.use('/test', testRoute)
```
then `testRoute` will always be ignored, as the line above it catches everything.

---

Now in your routes file(s), which should be in `src/api/routes/`, the structure should be similar to the following:
```js
import express from 'express'
import asyncHandler from 'express-async-handler'
import * as controller from '../controllers/testController.js'

const router = express.Router()

router.get('/', asyncHandler(controller.getTest))
router.post('/', asyncHandler(controller.addTest))
router.patch('/:id', asyncHandler(controller.updateTest))
router.delete('/:id', asyncHandler(controller.deleteTest))

export default router
```
The path for the controller can be changed depending on how you named your file(s).

Here, the `'/'` refers to what you defined in `app.js`.

---

**Careful!** If you were to write
```js
router.get('/test', asyncHandler(controller.getTest))
```
while having written
```js
app.use('/test', testRoute)
```
in `app.js`, then your resulting route would be `http://localhost:3000/test/test`.

---

**Careful!** You must pass the function itself to `asyncHandler()` and not the result of the function. This means **NOT** writing `()`, otherwise that would call the function. For example:
```js
router.get('/test', asyncHandler( controller.getTest() ))
//                                                  ^^ Do NOT put this here!
```
Because the routes files are loaded (imported) before the dotenv config can be loaded, you may receive an error message telling you about database connection, if the controller then proceeds to call the model, which tries to interface with the database. While the dotenv config file isn't loaded, you cannot interface with the database, as at this point the host, port, user, password, database, and such are not yet known.

---

Take note of the `:id` bit in the following:
```js
router.patch('/:id', asyncHandler(controller.updateTest))
router.delete('/:id', asyncHandler(controller.deleteTest))
```
This is called a **path parameter** and can be accessed in the controller using `req.params`. You usually use this for PATCH and DELETE, where the path shall contain the ID of the thing to be updated or deleted. You'd then use this like
```http
PATCH http://localhost:3000/123
DELETE http://localhost:3000/64
```
The `:` is what makes you define it as a path parameter instead of extending the path. It's only for the definition; you do not write the `:` when using it as seen in the above code block.

# 6. Writing Controllers
Controllers should be structured as follows:
```js
import * as model from '../models/testModel.js'

export const getTest = async (req, res) => {
  const test = await model.getTestDb()

  return res.status(200).json(test)
}
```

---

You can access path parameters from `req.params`. These are always strings.  
You can access query parameters from `req.query`. These are always strings.  
You can access the request body from `req.body`. These can be different variable types.

Path parameters were explained above.  
Query parameters are extra things that can be added to any URL. They come after a `?`, use the `key=value` syntax, and are separated by `&`.  
The request body is used to transfer data and is wrapped in `{}` in the `rest.http` example below. This is where you should send data, sensitive too. HTTPS connections encrypt this.

```http
PATCH http://localhost:3000/myRoute/123?queryParameter=something&another=else
Content-Type: application/json

{
  "myColumn": "myNewValue",
  "myOtherColumn": 123
}
```

---

The controller is where you can check the given data, e.g. if a number should not be negative, then you could write:
```js
export const addTest = async (req, res) => {
  const { myNumber } = req.body

  if (myNumber < 0) {
    res.status(403).json('myNumber cannot be less than 0')
    return
  }

  const test = model.addTestDb(myNumber)

  return res.status(200).json(test)
}
```

---

Note the use of the [destructuring syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring). In a nutshell:
```js
const myString = req.body.myString
const myNumber = req.body.myNumber
const myPicture = req.body.myPicture
```
can instead be written as
```js
const { myString, myNumber, myPicture } = req.body
```

---

You can also check the result from the model and respond with something different based on that:
```js
export const deleteTest = async (req, res) => {
  const { id } = req.params

  const result = model.deleteTestDb(id)

  if (!result) {
    return res.status(204)
  }

  return res.status(200).json(result)
}
```
In this case specifically, you may also want to call a get function from the Model to check if the object exists before deleting, then send 404 if it doesn't.

Please take note of the [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). What you may likely mostly use are:
- 200: OK
- 201: Created
- 204: No Content
- 400: Bad Request
- 403: Forbidden
- 404: Not Found

You may also find use in:
- 405: Method Not Allowed
- 406: Not Acceptable
- 418: I'm a teapot

# 7. Writing Models
Models start by importing `query`:
```js
import query from '../../db/index.js'
```

For a basic SQL query on a single line, use the following structure:
```js
export const getStuffDb = async () => {
  const result = await query('SELECT * FROM mytable;')
  return result.rows
}
```

For multi-line SQL and for [Prepared SQL Statements](https://en.wikipedia.org/wiki/Prepared_statement):
```js
export const updateStuffDb = async (id, myColumn, myOtherColumn) => {
  const result = await query(
    `
     UPDATE mytable SET
       mycolumn = $1,
       myothercolumn = $2
     WHERE myID = $3
     RETURNING *;
    `,
    [myColumn, myOtherColumn, id]
  )
  return result.rows[0]
}
```
**Minor Heads Up:** The order of the parameters after the keyword `async` (function definition) should match what you write in the Controller.
E.g., if you write `model.updateStuffDb(id, myColumn, myOtherColumn)` in the Controller, then this function should accept these parameters in that order. An example of a mistake would be to write `model.updateStuffDb(myColumn, myOtherColumn, id)` in the Controller, as this is not how `updateStuffDb` is actually defined.

For the prepared statement, you should count in order (`$1 $2 $3` instead of `$2 $3 $1`) and the following array should also be in that order.

Remember to write `RETURNING *` for INSERTs, UPDATEs, and DELETEs, if you wish.

If you expect to receive only one object, like from INSERTs, UPDATEs, DELETEs, or more likely, SELECTs that only fetch 1 object, then be sure to return that object itself using `result.rows[0]`.

# 8. Running/Starting this Project
Note the scripts in the `package.json`:
```json
"scripts": {
  "dev": "nodemon ./src/app.js",
  "lint": "standard . --ext .js --fix",
  "start": "node ./src/app.js"
},
```

You can run these by typing
```sh
npm run dev
npm run lint
npm run start
```

`dev` uses `nodemon`. This looks for changes in files, so when you make a change and save, nodemon will automatically restart the server for you. In semi-rare cases, you may still have to kill nodemon and start it again (`npm run dev`) should you encounter a strange issue.

`start` simply runs the project using node and doesn't monitor anything. If you change something and save, then you need to restart your self (e.g. Ctrl+C to stop/kill node in the terminal, then type the npm run command again)

`lint` will run [Standard](https://standardjs.com/) and automatically attempt to fix any linting issues. If you want, you could also make a separate script to only check for issues and not fix them. In that case, you'd run the command without the `--fix` option, i.e.
```
"standard . --ext .js"
```

Standard is not an actual standard, it's just called that. I personally like its linting rules. One notable thing about this linter is that it forbids semicolons unless required.

If you want to use a different linter, you can uninstall Standard and set up ESLint instead. Such packages are for development, so they should be in `devDependencies`.

# 9. Testing using `rest.http`
The structure of this file can look like this:
```http
GET http://localhost:3000/test
###
GET http://localhost:3000/myRoute
###
POST http://localhost:3000/myRoute
Content-Type: application/json

{
  "myColumn": "myValue"
}
###
PATCH http://localhost:3000/myRoute/0
Content-Type: application/json

{
  "myColumn": "myNewValue",
  "myOtherColumn": 1
}
###
DELETE http://localhost:3000/myRoute/0
###
```
Requests are separated by at least 3 hashtags (#). If you prefer not to write `http://localhost:3000` all the time, you can instead do:
```http
@baseURL = http://localhost:3000

GET {{baseURL}}/test
###
```

---

**Careful!** When writing a request that has a request body, you must leave an empty line between `Content-Type` and the request body.
For example, the following is **INCORRECT**:
```http
PATCH http://localhost:3000/myRoute/0
Content-Type: application/json
{
  "myColumn": "myNewValue",
  "myOtherColumn": 1
}
```

---

**Careful!** When writing a request that has a request body, the key-value pairs must be separated by commas and **must not have a trailing comma**. For example, the following is **INCORRECT**:
```http
PATCH http://localhost:3000/myRoute/0
Content-Type: application/json

{
  "myColumn": "myNewValue",
  "myOtherColumn": 1,
}
```

# Closing Notes
Thank you for taking your time to read through this. If you have any suggestions, you may open an Issue in this GitHub repository.

I may revise this file in the future.