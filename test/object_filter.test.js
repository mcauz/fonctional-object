"use strict";

require("../lib/object");
const integrity = require("./utils/integrity");

describe("object_filter", () => {

    function test (value, key) {

        return typeof value === "number" && key.indexOf("a") === 0;

    }

    it("Params of arguments", () => {

        const obj = {test: 10};
        obj.every((value, key, o) => {
            if (value !== 10 || key !== "test" || !integrity(obj, o)) throw Error("Invalid arguments for the callback.");
        });

    });

    it("One correct object", () => {

        const obj = {"a1": 10, "b2": 20};
        const res = obj.filter(test);

        if (Object.keys(res).length !== 1 || res["a1"] !== 10) throw Error("The expected response is {a1: 10} and not "+JSON.stringify(res));

    });

    it("Writable", () => {

        const obj = {};
        obj.filter = 10;

    });

    it("Check this params", () => {

        ({}).filter(() => {
            if (this !== 20) throw Error("Invalid this for the callback. Expected: 20. Actual: "+this);
        }, 20);

    });

});