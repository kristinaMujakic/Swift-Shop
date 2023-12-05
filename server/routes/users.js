"use strict";

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");

const router = express.Router();

/**
 * Route to register a new user.
 * POST /users/
 * Returns the newly created user and an authentication token for them:
 * { user: { username, firstName, lastName, email }, token }
 * Authorization required: logged-in user
 */
router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
        // // Validate request body using jsonschema
        // const validator = jsonschema.validate(req.body, userNewSchema);
        // if (!validator.valid) {
        //     const errs = validator.errors.map(e => e.stack);
        //     throw new BadRequestError(errs);
        // }

        // Register the new user
        const user = await User.register(req.body);
        const token = createToken(user);
        return res.status(201).json({ user, token });
    } catch (err) {
        return next(err);
    }
});

/**
 * Route to get user details by username.
 * GET /users/:username
 * Returns { username, firstName, lastName, email, jobs }
 * where jobs is { id, title, companyHandle, companyName, state }
 * Authorization required: logged-in user
 */
router.get("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        // Retrieve user details
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

/**
 * Route to update user details by username.
 * PATCH /users/:username
 * Data can include: { firstName, lastName, password, email }
 * Returns { username, firstName, lastName, email }
 * Authorization required: logged-in user
 */
router.patch("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        // // Validate request body using jsonschema
        // const validator = jsonschema.validate(req.body, userUpdateSchema);
        // if (!validator.valid) {
        //     const errs = validator.errors.map(e => e.stack);
        //     throw new BadRequestError(errs);
        // }

        // Update user details
        const user = await User.update(req.params.username, req.body);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

/**
 * Route to delete a user by username.
 * DELETE /users/:username
 * Returns { deleted: username }
 * Authorization required: logged-in user
 */
router.delete("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        // Remove the user
        await User.remove(req.params.username);
        return res.json({ deleted: req.params.username });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
