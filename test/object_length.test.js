"use strict";

require("../lib/object");

describe("object_length", () => {

    it("Empty object", () => {

        if ({}.length !== 0) throw Error("The object is really empty.");

    });

    it("Object of size two", () => {

        if ({test: 10, hello: 20}.length !== 2) throw Error("The object contains two values.");

    });

    it("Object with sub object", () => {

        if ({test: {a: 1}}.length !== 1) throw Error("The object contains one element at the root.");

    });

    it("Writable", () => {

        const obj = {};
        obj.length = 10;

    });

});