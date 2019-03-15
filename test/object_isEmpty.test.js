"use strict";

require("../lib/object");

describe("object_isEmpty", () => {

    it("Empty object", () => {

        if (!{}.isEmpty) throw Error("The object is really empty.");

    });

    it("Object of size two", () => {

        if ({test: 10, hello: 20}.isEmpty) throw Error("The object contains two values.");

    });

    it("Writable", () => {

        const obj = {};
        obj.isEmpty = 10;

    });

});