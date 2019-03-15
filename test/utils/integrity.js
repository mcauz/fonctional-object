"use strict";

module.exports = function integrity (init, copy) {

    if (Array.isArray(init))
        return Array.isArray(copy) && copy.length === init.length && init.every((i, k) => integrity(i, copy[k]));
    else if (typeof init === "symbol") return typeof copy === "symbol";
    else if (typeof init !== "object") return init === copy;
    else {

        if (typeof copy !== "object") return false;
        for (let [key, value] of Object.entries(init)) if (!integrity(value, copy[key])) return false;
        return true;

    }

};