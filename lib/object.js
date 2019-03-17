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

const reassignment = {configurable: true, writable: true, enumerable: true};

/**
 * Create a deep clone of the object.
 *
 * @function clone
 * @returns {Object}
 */
Object.defineProperty(Object.prototype, "clone", {value: function () {

    // Initialize the new object
    const object = {};

    // Sub method
    function sub (source) {

        if (Array.isArray(source)) return source.map((value) => value);
        else if (typeof source === "symbol") return Symbol();
        else if (typeof source !== "object") return source;
        else return source.clone();

    }

    // browses the object to complete the new array
    for (let [key, value] of Object.entries(this)) object[key] = sub(value);

    // Return the object
    return object;

}, writable: true, configurable: true});

/**
 * Check if each entry of an object respect a callback.
 *
 * @function every
 * @param {entryCallback} callback - The callback for each entry of the object.
 * @param {*} [thisArg] - The value of this for the callback.
 * @returns {boolean}
 */
Object.defineProperty(Object.prototype, "every", {value: function (callback, thisArg) {

    // Preconditions
    Assert(typeof callback === "function", "The parameter 'callback' must be a function.");

    // Browses the object to execute the callback on each entry
    for (let [key, value] of Object.entries(this)) if (!callback.call(thisArg, value, key, this)) return false;

    // Return the default value
    return true;

}, writable: true, configurable: true});

/**
 * Filters the entries of an object.
 *
 * @function filter
 * @param {entryCallback} cond - The callback for each entry of the object.
 * @param {*} [thisArg] - The value of this for the callback.
 * @returns {object}
 */
Object.defineProperty(Object.prototype, "filter", {value: function (cond, thisArg) {

    // Preconditions
    Assert(typeof cond === "function", "The parameter 'cond' must be a function.");

    // Select the right entries
    const obj = {};
    for (let [key, value] of Object.entries(this)) if (cond.call(thisArg, value, key, this)) obj[key] = value;

    // Return the new object
    return obj;

}, writable: true, configurable: true});

/**
 * Finds an element in the object. Use a dot for the recursion.
 *
 * @function find
 * @param {String} key - The key of the element.
 * @returns {*}
 */
Object.defineProperty(Object.prototype, "find", {value: function (key) {

    // Preconditions
    Assert(typeof key === "string", "The parameter 'key' must be a string.");

    // Trivial case
    if (typeof this[key] !== "undefined") return this[key];
    if (key.indexOf(".") === -1) return;

    // Recursively case
    const skey = key.substring(0, key.indexOf("."));
    if (typeof this[skey] === "object") return this[skey].find(key.substr(key.indexOf(".")+1));

}, writable: true, configurable: true});

/**
 * Execute a callback on each entry of the object.
 *
 * @function forEach
 * @param {entryCallback} callback - The callback for each entry of the object.
 * @param {*} [thisArg] - The value of this for the callback.
 */
Object.defineProperty(Object.prototype, "forEach", {value: function (callback, thisArg) {

    // Preconditions
    Assert(typeof callback === "function", "The parameter 'callback' must be a function.");

    // Browses the object to execute the callback on each entry
    for (let [key, value] of Object.entries(this)) callback.call(thisArg, value, key, this);

}, writable: true, configurable: true});

/**
 * Check the existence of an element in the object. Use a dot for the recursion.
 *
 * @function has
 * @param {String} key - The key of the element.
 * @returns {boolean}
 */
Object.defineProperty(Object.prototype, "has", {value: function (key) {

    // Preconditions
    Assert(typeof key === "string", "The parameter 'key' must be a string.");

    // Trivial case
    if (typeof this[key] !== "undefined") return true;
    if (key.indexOf(".") === -1) return false;

    // Recursively case
    const skey = key.substring(0, key.indexOf("."));
    return (typeof this[skey] === "object") ? this[skey].has(key.substr(key.indexOf(".")+1)) : false;

}, writable: true, configurable: true});

/**
 * Indicates if the object is empty or not.
 *
 * @member {boolean} isEmpty
 */
Object.defineProperty(Object.prototype, "isEmpty", {get: function () {

    return Object.keys(this).length === 0;

}, set: function (value) {

    Object.defineProperty(this, "isEmpty", Object.assign({value}, reassignment));

}, configurable: true});

/**
 * Gets the number of element in the object.
 *
 * @member {Number} length
 */
Object.defineProperty(Object.prototype, "length", {get: function () {

    return Object.keys(this).length;

}, set: function (value) {

    Object.defineProperty(this, "length", Object.assign({value}, reassignment));

}, configurable: true});

/**
 * Create a new object from this object.
 *
 * @function map
 * @param {entryCallback} value - The callback for the key.
 * @param {entryCallback} [key] - The callback for the key.
 * @param {*} [thisArgValue] - The value of this for the callback 'value'.
 * @param {*} [thisArgKey] - The value of this for the callback 'key'.
 * @returns {object}
 */
Object.defineProperty(Object.prototype, "map", {value: function (value, key = (v, k) => k, thisArgValue, thisArgKey) {

    // Preconditions
    Assert(typeof key === "function", "The parameter 'key' must be a function.");
    Assert(typeof value === "function", "The parameter 'value' must be a function.");

    // Initialize the new object
    const object = {};

    // Browses the object to execute the transformation
    for (let [k, v] of Object.entries(this)) object[key.call(thisArgKey, v, k, this)] = value.call(thisArgValue, v, k, this);

    // Return the new object
    return object;

}, writable: true, configurable: true});

/**
 * Check if at least one entry of an object respect a callback.
 *
 * @function some
 * @param {entryCallback} callback - The callback for each entry of the object.
 * @param {*} [thisArg] - The value of this for the callback.
 * @returns {boolean}
 */
Object.defineProperty(Object.prototype, "some", {value: function (callback, thisArg) {

    // Preconditions
    Assert(typeof callback === "function", "The parameter 'callback' must be a function.");

    // Browses the object to execute the callback on each entry
    for (let [key, value] of Object.entries(this)) if (callback.call(thisArg, value, key, this)) return true;

    // Return the default value
    return false;

}, writable: true, configurable: true});

/**
 * This callback receive an entry of an object.
 *
 * @callback entryCallback
 * @param {*} value - The current value of the object entry.
 * @param {number} key - The current key of the object entry.
 * @param {object} object - The object that contains the pair <key, value>.
 */