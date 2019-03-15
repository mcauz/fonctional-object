"use strict";

require("../lib/array");
const integrity = require("./utils/integrity");

describe("array_toObject", () => {

    function keyFct (value, key) { return "key-"+key; }
    function valueFct (value, key) { return key+"-"+value; }

    it("Params of arguments", () => {

        const arr = [10];
        arr.toObject((value, key, a) => {
            if (value !== 10 || key !== 0 || !integrity(arr, a)) throw Error("Invalid arguments for the keyCallback.");
        }, (value, key, a) => {
            if (value !== 10 || key !== 0 || !integrity(arr, a)) throw Error("Invalid arguments for the valueCallback.");
        })

    });

    it("Check the resulted object", () => {

        const arr = [10, "test"];
        const obj = arr.toObject(keyFct, valueFct);

        if (typeof obj !== "object" || obj["key-0"] !== "0-10" || obj["key-1"] !== "1-test" || Object.keys(obj).length !== 2)
            throw Error("The object "+JSON.stringify(obj)+" must be "+JSON.stringify(arr));

    });

    it("Writable", () => {

        const arr = [];
        arr.toObject = 10;

    });

});
