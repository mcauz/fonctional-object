"use strict";

require("../lib/object");
const integrity = require("./utils/integrity");

describe("object_clone", () => {

    it("Empty object", () => {

        const obj = {};
        const copy = {};
        const clone = obj.clone();

        if (typeof clone !== "object") throw "The clone must be an object.";

        if (!integrity(obj, clone)) throw Error("The clone "+JSON.stringify(clone)+" must be "+JSON.stringify(obj));

        obj["test"] = "test";

        if (!integrity(copy, clone)) throw Error("The clone mustn't reference the initial object or its items.");

    });

    it("Object with no sub array or object", () => {

        const obj = {"num": 5, "test": "test"};
        const copy = {"num": 5, "test": "test"};
        const clone = obj.clone();

        if (typeof clone !== "object") throw "The clone must be an object.";

        if (!integrity(obj, clone)) throw Error("The clone "+JSON.stringify(clone)+" must be "+JSON.stringify(obj));

        obj["hello"] = "hello";
        obj["num"] = 10;
        obj["test"] = "Good";

        if (!integrity(copy, clone)) throw Error("The clone mustn't reference the initial object or its items.");

    });

    it("Object with a sub array and a sub object", () => {

        const obj = {"tab": [5], "obj": {test: "hello"}};
        const copy = {"tab": [5], "obj": {test: "hello"}};
        const clone = obj.clone();

        if (typeof clone !== "object") throw "The clone must be an object.";

        if (!integrity(obj, clone)) throw Error("The clone "+JSON.stringify(clone)+" must be "+JSON.stringify(obj));

        obj["test"] = "test";
        obj["tab"][0] = 10;
        obj["tab"].push("test");
        obj["obj"].test = "test";
        obj["obj"].hello = "test";

        if (!integrity(copy, clone)) throw Error("The clone mustn't reference the initial object or its items.");

    });

    it("Object with symbol", () => {

        const sym = Symbol();
        const obj = {"sym": sym};
        const copy = {"sym": sym};
        const clone = obj.clone();

        if (typeof clone !== "object") throw "The clone must be an object.";

        if (!integrity(obj, clone)) throw Error("The clone "+JSON.stringify(clone)+" must be "+JSON.stringify(obj));

        obj["test"] = "test";
        obj["sym"] = 10;

        if (!integrity(copy, clone)) throw Error("The clone mustn't reference the initial object or its items.");

    });

    it("Writable", () => {

        const obj = {};
        obj.clone = 10;

    });

});
