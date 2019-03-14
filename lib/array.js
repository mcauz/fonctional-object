"use strict";

const Assert = require("assert");

/**
 * Transforms the array into an object.
 *
 * @function toObject
 * @param {entryCallback} key - A callback that give the key.
 * @param {entryCallback} value - A callback that give the value.
 * @returns {Object}
 */
Object.defineProperty(Array.prototype, "toObject", {get: function (key, value) {

    // Preconditions
    Assert(typeof key === "function", "The parameter 'key' must be a function.");
    Assert(typeof value === "function", "The parameter 'value' must be a function.");

    // Initialization of the object
    const object = {};

    // Browses the array to complete the object
    this.forEach((v, k) => object[key(v, k, this)] = value(v, k, this), this);

    // Return the object
    return object;

}, writable: true, configurable: true});

/**
 * Create a deep clone of the array.
 *
 * @function clone
 * @returns {Array}
 */
Object.defineProperty(Array.prototype, "clone", {get: function () {

    // Initialize the new array
    const array = [];

    // browses the array to complete the new array
    this.forEach((v) => array.push((typeof v === "object") ? v.clone() : v));

    // Return the array
    return array;

}, writable: true, configurable: true});

/**
 * This callback receive an entry of an array.
 *
 * @callback entryCallback
 * @param {*} value - The current value of the array entry.
 * @param {number} key - The current key of the array entry.
 * @param {array} array - The array that contains the value.
 */