/*
 The MIT License (MIT)
 Copyright (c) 2019 Maxime Cauz

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/

"use strict";

const Assert = require("assert");

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
 * This callback receive an entry of an array.
 *
 * @callback entryCallback
 * @param {*} value - The current value of the array entry.
 * @param {number} key - The current key of the array entry.
 * @param {array} array - The array that contains the value.
 */