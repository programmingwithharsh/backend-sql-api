const express = require('express');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const bodyParser = require('body-parser')
const app = express();
app.use(cors());
const queries = require("./queries");

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

/**
* @swagger
*   /:
*   get:
*     description: get info message
*     tags:
*       - users
*     produces:
*       - application/json
*     responses:
*       200:
*        description: users
*        schema:
*          $ref: "/"
*
*/
app.get('/', function (req, res) {
    res.send('Hello World');
})


/**
* @swagger
*   /users:
*   get:
*     description: get users list
*     tags:
*       - users
*     produces:
*       - application/json
*     responses:
*       200:
*        description: users
*        schema:
*          $ref: "/users"
*
*/
app.get('/users', queries.getUsers);

/**
* @swagger
*   /users/{id}:
*   get:
*     description: return specific user
*     tags:
*       - users
*     produces:
*       - application/json
*     parameters:
*        - name: id
*          description: id of the user to retrieve
*          in: path
*          required: true
*          type: number
*     responses:
*       200:
*        description: users
*        schema:
*          $ref: "/users"
*
*/
app.get('/users/:id', queries.getUserById);

/**
* @swagger
*   /users/{id}:
*   delete:
*     description: delete specific user
*     tags:
*       - users
*     produces:
*       - application/json
*     parameters:
*        - name: id
*          description: delte user
*          in: path
*          required: true
*          type: number
*     responses:
*       200:
*        description: users
*        schema:
*          $ref: "/users"
*
*/
app.delete('/users/:id', queries.deleteUserById);

/**
* @swagger
* /users:
*   post:
*     description: Create a new user
*     tags:
*       - users
*     requestBody:
*       description: Create user object
*       content:
*           application/json:
*               schema:
*                $ref: '#/components/schemas/User'
*           application/xml:
*               schema:
*                   $ref: '#/components/schemas/User'
*           application/x-www-form-urlencoded:
*               schema:
*                   $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: new user
*         schema:
*           $ref: '/users'
*/
app.post('/users', queries.addUser);

/**
* @swagger
*   /users/{id}:
*   put:
*     description: return specific user
*     tags:
*       - users
*     produces:
*       - application/json
*     parameters:
*        - name: id
*          description: id of the user to update
*          in: path
*          required: true
*          type: number
*     requestBody:
*       description: Create user object
*       content:
*           application/json:
*               schema:
*                $ref: '#/components/schemas/User'
*           application/xml:
*               schema:
*                   $ref: '#/components/schemas/User'
*           application/x-www-form-urlencoded:
*               schema:
*                   $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: new user
*         schema:
*           $ref: '/users'
*/

app.put('/users/:id', queries.updateUser);

/**
* @swagger
* components:
*   schemas:
*       User:
*           type: object
*           properties:
*               name:
*                   type: string
*                   example: harsh
*               email:
*                   type: string
*                   example: harsh@gmail.com
*/


app.listen(4200);