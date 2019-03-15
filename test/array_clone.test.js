"use strict";

require("../lib/array");
const integrity = require("./utils/integrity");

describe("array_clone", () => {

    it("Empty array", () => {

        const arr = [];
        const copy = [];
        const clone = arr.clone();

        if (!Array.isArray(clone)) throw "The clone must be an array.";

        if (!integrity(arr, clone)) throw Error("The clone "+JSON.stringify(clone)+" must be "+JSON.stringify(arr));

        arr.push("test");

        if (!integrity(copy, clone)) throw Error("The clone mustn't reference the initial array or its items.");

    });

    it("Array with no sub array or object", () => {

        const arr = [5, "test"];
        const copy = [5, "test"];
        const clone = arr.clone();

        if (!Array.isArray(clone)) throw "The clone must be an array.";

        if (!integrity(arr, clone)) throw Error("The clone "+JSON.stringify(clone)+" must be "+JSON.stringify(arr));

        arr.push("hello");
        arr[0] = 10;
        arr[1] = "Good";

        if (!integrity(copy, clone)) throw Error("The clone mustn't reference the initial array or its items.");

    });

    it("Array with a sub array and a sub object", () => {

        const arr = [[5], {test: "hello"}];
        const copy = [[5], {test: "hello"}];
        const clone = arr.clone();

        if (!Array.isArray(clone)) throw Error("The clone must be an array.");

        if (!integrity(arr, clone)) throw Error("The clone "+JSON.stringify(clone)+" must be "+JSON.stringify(arr));

        arr.push("test");
        arr[0][0] = 10;
        arr[0].push("test");
        arr[1].test = "test";
        arr[1].hello = "test";

        if (!integrity(copy, clone)) throw Error("The clone mustn't reference the initial array or its items.");

    });

    it("Array with symbol", () => {

        const sym = Symbol();
        const arr = [sym];
        const copy = [sym];
        const clone = arr.clone();

        if (!Array.isArray(clone)) throw Error("The clone must be an array.");

        if (!integrity(arr, clone)) throw Error("The clone "+JSON.stringify(clone)+" must be "+JSON.stringify(arr));

        arr.push("test");
        arr[0] = 10;

        if (!integrity(copy, clone)) throw Error("The clone mustn't reference the initial array or its items.");

    });

    it("Writable", () => {

        const arr = [];
        arr.clone = 10;

    });

});
