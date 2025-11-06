"use strict";

const fs = require("fs");
const httpStatus = require("http-status-codes/build/cjs");
const contentTypes = require("./contentTypes");

module.exports = {
    getFile: (file, res) => {
        fs.readFile(`./${file}`, (error, data) => {
            if (error) {
                // Only send headers once, then end response
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
                return res.end("There was an error serving content!");
            }
            res.writeHead(httpStatus.OK, contentTypes.html);
            res.end(data);
        });
    }
};
