"use strict";

require("../lib/object");
const integrity = require("./utils/integrity");

describe("object_every", () => {

    function valueFct (value, key) { return key; }

    function keyFct (value) { return value; }

    it("Params of arguments", () => {

        const obj = {test: 10};
        obj.map((value, key, o) => {
            if (value !== 10 || key !== "test" || !integrity(obj, o)) throw Error("Invalid arguments for the valueCallback.");
        }, (value, key, o) => {
            if (value !== 10 || key !== "test" || !integrity(obj, o)) throw Error("Invalid arguments for the keyCallback.");
        });

    });

    it("Check result", () => {

        const obj = {"a1": "test", "a2": "hello"};
        const map = obj.map(valueFct, keyFct);

        if (map.test !== "a1" || map.hello !== "a2" || Object.keys(map).length !== 2)
            throw Error("The expected result is "+JSON.stringify({test: "a1", hello: "a2"})+" and not "+JSON.stringify(map));

    });

    it("Default parameter", () => {

        const obj = {"a1": "test", "a2": "hello"};
        const map = obj.map(valueFct);

        if (map.a1 !== "a1" || map.a2 !== "a2" || Object.keys(map).length !== 2)
            throw Error("The expected result is "+JSON.stringify({a1: "a1", a2: "a2"})+" and not "+JSON.stringify(map));

    });

    it("Writable", () => {

        const obj = {};
        obj.map = 10;

    });

});