const Pool = require("pg").Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'demo',
})

// GET ALL USERS
const getUsers = (request, response) => {
    pool.query("SELECT * FROM users", function (error, results) {
        if (error) {
            throw error
        }
        return response.status(200).send(results.rows);
    })
}

// GET USER BY ID
const getUserById = (request, response) => {
    let id = +(request.params.id);
    pool.query(`SELECT * FROM users where id = ${id}`, function (error, results) {
        if (error) {
            throw error
        }
        return response.status(200).send(results.rows);
    })
}

// DELETE USER BY ID
const deleteUserById = (request, response) => {
    let id = +(request.params.id);
    pool.query(`DELETE FROM users where id = ${id}`, function (error, results) {
        if (error) {
            throw error
        }
        return response.status(200).send(`Deleted User ID:${id}`);
    })
}

// ADD NEW USER
const addUser = (request, response) => {
    let { name, email } = request.body;
    let sqlQuery = `INSERT INTO users(name, email) VALUES ('${name}', '${email}')`;
    pool.query(sqlQuery, function (error, results) {
        if (error) {
            throw error
        }
        return response.status(200).send("Added User");
    })
}

// UPDATE EXISTING USER
const updateUser = (request, response) => {
    let id = +(request.params.id);
    let { name, email } = request.body;
    pool.query(`UPDATE users SET name='${name}', email='${email}' where id = ${id}`, function (error, results) {
        if (error) {
            throw error
        }
        return response.status(200).send(`Update User Id: ${id}`);
    })
}

module.exports = {
    getUsers,
    getUserById,
    deleteUserById,
    addUser,
    updateUser
}