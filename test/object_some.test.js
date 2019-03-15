"use strict";

require("../lib/object");
const integrity = require("./utils/integrity");

describe("object_some", () => {

    function test (value, key, obj) {

        return typeof value === "number" && key.indexOf("a") === 0 && obj.length === 2;

    }

    it("Params of arguments", () => {

        const obj = {test: 10};
        obj.some((value, key, o) => {
            if (value !== 10 || key !== "test" || !integrity(obj, o)) throw Error("Invalid arguments for the callback.");
        });

    });

    it("Correct object", () => {

        const obj = {"test": 10, "a2": 20};

        if (!obj.some(test)) throw Error("The expected response is true.");

    });

    it("Bad object", () => {

        const obj = {"test": 10, "a2": "test"};

        if (obj.some(test)) throw Error("The expected response is false.");

    });

    it("Writable", () => {

        const obj = {};
        obj.some = 10;

    });

});