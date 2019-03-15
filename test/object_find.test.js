"use strict";

require("../lib/object");

describe("object_find", () => {

    it("Element at the root", () => {

        const obj = {test: 10};
        const elt = obj.find("test");

        if (elt !== 10) throw Error("The expected value is 10 and not "+elt);

    });

    it("Element at the sub level", () => {

        const obj = {test: {hello: {value: 10}}};
        const elt = obj.find("test.hello.value");

        if (elt !== 10) throw Error("The expected value is 10 and not "+elt);

    });

    it("Not existing element", () => {

        const obj = {test: 10};
        const elt = obj.find("hello");

        if (typeof elt !== "undefined") throw Error("The expected value is undefined and not "+elt);

    });

    it("Not existing element in sub level", () => {

        const obj = {test: {hello: 10}};
        const elt = obj.find("test.hello.test");

        if (typeof elt !== "undefined") throw Error("The expected value is undefined and not "+elt);

    });

    it("Writable", () => {

        const obj = {};
        obj.find = 10;

    });

});