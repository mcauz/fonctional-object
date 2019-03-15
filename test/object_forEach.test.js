"use strict";

require("../lib/object");
const integrity = require("./utils/integrity");

describe("object_every", () => {

    it("Params of arguments", () => {

        const obj = {test: 10};
        obj.forEach((value, key, o) => {
            if (value !== 10 || key !== "test" || !integrity(obj, o)) throw Error("Invalid arguments for the callback.");
        });

    });

    it("Check the result", () => {

        const obj = {"a1": 10, "a2": 20};
        const copy = {};

        obj.forEach((value, key) => copy[key] = value);

        if (copy.a1 !== 10 || copy.a2 !== 20) throw Error("The callback doesn't work.");

    });

    it("Writable", () => {

        const obj = {};
        obj.forEach = 10;

    });

});