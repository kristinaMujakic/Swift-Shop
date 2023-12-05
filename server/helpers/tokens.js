const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** Return signed JWT from user data. */
function createToken(user) {
    console.assert(user.username !== undefined, "createToken passed user without username property");

    let payload = {
        username: user.username,
    };

    return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
