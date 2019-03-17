"use strict";

require("../lib/object");
const integrity = require("./utils/integrity");

describe("object_every", () => {

    function test (value, key, obj) {

        return typeof value === "number" && key.indexOf("a") === 0 && obj.length === 2;

    }

    it("Params of arguments", () => {

        const obj = {test: 10};
        obj.every((value, key, o) => {
            if (value !== 10 || key !== "test" || !integrity(obj, o)) throw Error("Invalid arguments for the callback.");
        });

    });

    it("Correct object", () => {

        const obj = {"a1": 10, "a2": 20};

        if (!obj.every(test)) throw Error("The expected response is true.");

    });

    it("Bad object", () => {

        const obj = {"test": 10, "a2": 20};

        if (obj.every(test)) throw Error("The expected response is false.");

    });

    it("Writable", () => {

        const obj = {};
        obj.every = 10;

    });

    it("Check this params", () => {

        ({}).every(() => {
            if (this !== 20) throw Error("Invalid this for the callback. Expected: 20. Actual: "+this);
        }, 20);

    });

});