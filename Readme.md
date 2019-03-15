[![codecov](https://codecov.io/gh/mcauz/fonctional-object/branch/master/graph/badge.svg)](https://codecov.io/gh/mcauz/fonctional-object)

# Fonctional Object

This module adds functional methods and some useful methods on objects and arrays.
Each function can be rewritten so as not to block any other library.
It is also important to indicate that no method uses another method defined by this library other than itself.

## Installing

Install the package with npm :

    npm install fonctional-object --save

Import the package in your project :

    require("fonctional-object");

The methods are directly added to the prototypes of Object and Array.

## Summary of methods

- [Array.prototype.clone](#clone)
- [Array.prototype.toObject](#toObject)
- [Object.prototype.clone](#clone)
- [Object.prototype.every](#every)
- [Object.prototype.find](#find)
- [Object.prototype.forEach](#forEach)
- [Object.prototype.has](#has)
- [Object.prototype.isEmpty](#isEmpty)
- [Object.prototype.length](#length)
- [Object.prototype.map](#map)
- [Object.prototype.some](#some)

## Callback

### entryCallbackArray

    entryCallbackArray (value, key, array)

Params :

- **value (*)** - The current value of the array entry.
- **key (Number)** - The current key of the array entry.
- **array (Array)** - The array that contains the value.

### entryCallbackObject

    entryCallbackObject (value, key, object)

Params :

- **value (*)** - The current value of the object entry.
- **key (Number)** - The current key of the object entry.
- **object (Object)** - The object that contains the value.

## Array methods

### clone

    const array = [10, "test"];
    const clone = array.clone ();

    array[0] = 20;

    // Value of array and clone at this point :
    // array : [20, "test"]
    // clone : [10, "test"]

Create a deep clone of the array.

Returns : **Array**

### toObject

    const key = (v) => v;
    const value = (v, k) => k;

    const array = [10, "test"];
    const object = array.toObject(key, value) // {"10": 0, "test": 1}

Transforms the array into an object.

Params :

- **key (entryCallbackArray)** - A callback that give the key.
- **value (entryCallbackArray) [optional]** - A callback that give the value. The default value return simply the value of the entry.

Returns : **Object**

## Object methods

### clone

    const object = {test: 10};
    const clone = object.clone();

    object.test = "hello";

    // The value of object and clone at this point :
    // object : {test: "hello"}
    // clone : {test: 10}

Create a deep clone of the object.

Returns : **Object**

### every

    const object = {test: 10, hello: 20};
    const success = object.every((value) => value >= 10); // True
    const failure = object.every((value) => value >= 20); // False

Check if each entry of an object respect a callback.

Params :

- **callback (entryCallbackObject)** - The callback for each entry of the object.

Returns : **Boolean**

### find

    const object = {test: {hello: 10}};
    const num = object.find("test.hello"); // 10
    const und = object.find("test.good"); // Undefined

Finds an element in the object. Use a dot for the recursion.

Params :

- **key (String)** - The key of the element.

Returns : *

### forEach

    const num = 0;
    const object = {test: 10, hello: 20};

    object.forEach((value, key) => num += value + key.length);
    // At this point, num = 39

Execute a callback on each entry of the object.

Params :

- **callback (entryCallbackObject)** - The callback for each entry of the object.

### has

    const object = {test: {hello: 10}};
    const num = object.find("test.hello"); // True
    const und = object.find("test.good"); // False

Check the existence of an element in the object. Use a dot for the recursion.

Params :

- **key (String)** - The key of the element.

Returns : **Boolean**

### isEmpty

    const object_1 = {};
    const object_2 = {test: 10};

    object_1.isEmpty // True
    object_2.isEmpty // False

Indicates if the object is empty or not. It's not a function.

### length

    const object_1 = {};
    const object_2 = {test: 10};

    object_1.length // 0
    object_2.length // 1

Gets the number of element in the object. It's not a function.

### map

    const key = (value) => value;
    const value = (value, key) => key;

    const object = {test: "t", hello: "h"};
    const obj = object.map(value, key); // {t: "test", h: "hello"}

Create a new object from this object.

Params :

- **value (entryCallbackObject)** - The callback for the key.
- **key (entryCallbackObject) [optional]** - The callback for the key. The default value return simply the key of the entry.

Returns : **Object**

### some

    const object = {test: 10, hello: 20};
    const success = object.some((value) => value >= 20); // True
    const failure = object.some((value) => value >= 30); // False

Check if at least one entry of an object respect a callback.

Params :

- **callback (entryCallbackObject)** - The callback for each entry of the object.

Returns : **Boolean**

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.