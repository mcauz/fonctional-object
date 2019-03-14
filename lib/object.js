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

    // Initialize the new array
    const object = {};

    // Browses the object to complete the new array
    for (let [key, value] of Object.entries(this)) object[key] = (typeof value === "object") ? value.clone() : value;

    // Return the array
    return object;

}, writable: true, configurable: true});

/**
 * Check if each entry of an object respect a callback.
 *
 * @function every
 * @param {entryCallback} callback - The callback for each entry of the object.
 * @returns {boolean}
 */
Object.defineProperty(Object.prototype, "every", {get: function (callback) {

    // Preconditions
    Assert(typeof callback === "function", "The parameter 'callback' must be a function.");

    // Browses the object to execute the callback on each entry
    for (let [key, value] of Object.entries(this)) if (!callback(value, key, this)) return false;

    // Return the default value
    return true;

}, writable: true, configurable: true});

/**
 * Finds an element in the object. Use a dot for the recursion.
 *
 * @function find
 * @param {String} key - The key of the element.
 * @returns {*}
 */
Object.defineProperty(Object.prototype, "find", {get: function (key) {

    // Preconditions
    Assert(typeof key === "string", "The parameter 'key' must be a string.");

    // Trivial case
    if (typeof this[key] !== "undefined") return this[key];
    if (key.indexOf(".") === -1) return;

    // Recursively case
    const skey = key.substring(0, key.indexOf("."));
    if (typeof this[skey] !== "undefined") return this[skey].find(key.substr(key.indexOf(".")+1));

}, writable: true, configurable: true});

/**
 * Execute a callback on each entry of the object.
 *
 * @function forEach
 * @param {entryCallback} callback - The callback for each entry of the object.
 */
Object.defineProperty(Object.prototype, "forEach", {get: function (callback) {

    // Preconditions
    Assert(typeof callback === "function", "The parameter 'callback' must be a function.");

    // Browses the object to execute the callback on each entry
    for (let [key, value] of Object.entries(this)) callback(value, key, this);

}, writable: true, configurable: true});

/**
 * Check the existence of an element in the object. Use a dot for the recursion.
 *
 * @function has
 * @param {String} key - The key of the element.
 * @returns {boolean}
 */
Object.defineProperty(Object.prototype, "has", {get: function (key) {

    // Preconditions
    Assert(typeof key === "string", "The parameter 'key' must be a string.");

    // Trivial case
    if (typeof this[key] !== "undefined") return true;
    if (key.indexOf(".") === -1) return false;

    // Recursively case
    const skey = key.substring(0, key.indexOf("."));
    return (typeof this[skey] !== "undefined") ? this[skey].has(key.substr(key.indexOf(".")+1)) : false;

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
 * @param {entryCallback} key - The callback for the key.
 * @param {entryCallback} value - The callback for the key.
 * @returns {object}
 */
Object.defineProperty(Object.prototype, "map", {value: function (key, value) {

    // Preconditions
    Assert(typeof key === "function", "The parameter 'key' must be a function.");
    Assert(typeof value === "function", "The parameter 'value' must be a function.");

    // Initialize the new object
    const object = {};

    // Browses the object to execute the transformation
    for (let [k, v] of Object.entries(this)) object[key(v, k, this)] = value(v, k, this);

    // Return the new object
    return object;

}, writable: true, configurable: true});

/**
 * Check if at least one entry of an object respect a callback.
 *
 * @function some
 * @param {entryCallback} callback - The callback for each entry of the object.
 * @returns {boolean}
 */
Object.defineProperty(Object.prototype, "some", {get: function (callback) {

    // Preconditions
    Assert(typeof callback === "function", "The parameter 'callback' must be a function.");

    // Browses the object to execute the callback on each entry
    for (let [key, value] of Object.entries(this)) if (callback(value, key, this)) return true;

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