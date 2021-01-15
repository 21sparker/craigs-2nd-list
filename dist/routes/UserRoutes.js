"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = express_1.Router({ strict: true });
exports.router.post('/', (req, res) => {
    controllers_1.userController.create(req, res);
});
exports.router.get('/:userId', (req, res) => {
    controllers_1.userController.read(req, res);
});
exports.router.patch('/:userId', (req, res) => {
    controllers_1.userController.update(req, res);
});
exports.router.delete('/:userId', (req, res) => {
    controllers_1.userController.delete(req, res);
});
