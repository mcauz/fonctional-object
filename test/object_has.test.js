"use strict";

require("../lib/object");

describe("object_has", () => {

    it("Element at the root", () => {

        const obj = {test: 10};

        if (!obj.has("test")) throw Error("The expected value is true.");

    });

    it("Element at the sub level", () => {

        const obj = {test: {hello: {value: 10}}};

        if (!obj.has("test.hello.value")) throw Error("The expected value is true.");

    });

    it("Not existing element", () => {

        const obj = {test: 10};

        if (obj.has("hello")) throw Error("The expected value is false.");

    });

    it("Not existing element in sub level", () => {

        const obj = {test: {hello: 10}};

        if (obj.has("test.hello.test")) throw Error("The expected value is false");

    });

    it("Writable", () => {

        const obj = {};
        obj.has = 10;

    });

});